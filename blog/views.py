from django.core import serializers
from django.http import HttpResponse ,JsonResponse
from blog.models import Post
from django.views.generic import View
# Create your views here.

def list(request):
    # post_list 是一个模型对象
    post_list = Post.objects.all().order_by('-created_time')
    # 和前端约定的返回格式
    data =  {"resCode": '0', "message": 'success',"result": []}

    # 序列化为 Python 类型
    data["result"] = serializers.serialize('python', post_list)
    print(data)
    # JsonResponse 接收一个 Dict类型的值
    return JsonResponse(data)

def index2(request):
    # post_list 是一个模型对象
    post_list = Post.objects.all().order_by('-created_time')
    # 和前端约定的返回格式
    data =  {"resCode": '0', "message": 'success',"result": []}

    # 序列化为 Python Dict 类型
    data["result"] = serializers.serialize('python', post_list)
    print(data)
    # JsonResponse 接收一个 Dict类型的值
    return HttpResponse(data)