import bs4
import requests
import sys
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker
import concurrent.futures
import threading

Base = declarative_base()
engine = create_engine('sqlite:identifier.sqlite', echo=True, connect_args={'check_same_thread': False})
Session = sessionmaker(bind=engine)
session = Session()
thread_local = threading.local()

def get_session():
    if not hasattr(thread_local, "session"):
        thread_local.session = requests.Session()
        return thread_local.session

class Book(Base):

    __tablename__ = 'Books'
    id = Column(Integer, primary_key=True)
    title = Column(String(80))
    price = Column(String(80))

    def __init__(self, title, price):
        self.title = title
        self.price = price

def add_new_book(title, price):
    book = Book(title, price)
    session.add(book)
    session.commit()

def crawl_and_save_books():
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0'}
    result = requests.get("https://allegro.pl/listing?string=flask%20development", headers=headers)
    allegro_page = result.text
    soup = bs4.BeautifulSoup(allegro_page, features="lxml")
    positions = soup.findAll('div',{"class":"mpof_ki mqen_m6 mp7g_oh mh36_0 mvrt_0 mg9e_8 mj7a_8 m7er_k4 _1y62o _9c44d_1I1gg"})

    for pos in positions:
        inner = pos.find('div', {"class":"mpof_ki myre_zn _9c44d_1Hxbq"})
        title = inner.find('div', {"class":"m7er_k4 _9c44d_3TzmE"}).find('h2').find('a').text
        price = inner.find('div', {"class":"_9c44d_3AMmE"}).find('div', {"class":"mpof_92 myre_zn"}).find('div', {"class":"msa3_z4 _9c44d_2K6FN"}).find('span').text
        print('"' + title + '"' + ' koszt: ' + price)
        add_new_book(title, price)

def setup_db():
    Base.metadata.create_all(engine)

if __name__ == '__main__':
    if "setupdb" in sys.argv:
        setup_db()
    else:
        crawl_and_save_books()
