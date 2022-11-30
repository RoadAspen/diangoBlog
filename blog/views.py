from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import render
from blog.models import Post
# Create your views here.

def index(request):
    post_list = Post.objects.all().order_by('-created_time')

    return render(request,'blog/index.html',context = {
        'title': '我的博客首页',
        'post_list': post_list
    })