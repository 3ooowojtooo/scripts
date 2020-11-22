import bs4
import requests

def run():
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

if __name__ == '__main__':
    run()