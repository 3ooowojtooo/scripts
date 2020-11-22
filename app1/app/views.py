from django.shortcuts import render

# Create your views here.
from app.forms import ProductForm
from app.models import Product


def products(request):
    list = Product.objects.all()
    return render(request, 'products.html', {'list':list})

def addProduct(request):
    if request.method == 'POST':
        formular = ProductForm(request.POST)
        if formular.is_valid():
            product = Product(name=request.POST['name'])
            product.save()
            return render(request, 'productadded.html')
    else:
        formular = ProductForm()
    return render(request, 'addprodukt.html', {'formular':formular})