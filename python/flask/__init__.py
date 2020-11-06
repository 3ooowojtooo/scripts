from flask import Flask, render_template


app = Flask(__name__)
app.config.from_object(__name__)

def init_db():
    pass

@app.route('/')
def index():
    return "Hello World"

#@app.route('/<path:path>/')
#def page(path):
#    return pages.get_or_404(path).html

@app.route('/delete/<id:int>/')
def page(id:int):
    return render_template('page.html', page=page)

@app.route('/list/')
def page():
    return render_template('page.html', page=page)


if __name__ == '__main__':
    init_db()
    app.run(host="0.0.0.0", port=5000)