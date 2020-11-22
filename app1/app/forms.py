from django import forms

class ProductForm(forms.Form):
    name = forms.CharField(label="Name", max_length=70)