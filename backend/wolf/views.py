# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import JsonResponse
from xml.etree import ElementTree
from wolf.wolf_config import wolf_base_url, app_id
from posts.models import Post
from posts.views import rank_post
import requests
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def wolf_search_view(request):
    if request.method == 'GET':
        return render(request, 'wolf/wolf_search.html')
    elif request.method == 'POST':
        raw_input = request.POST['keywords']
        xml_str = request_wolf_kb(raw_input)
        response_dict = process_wolf_response(xml_str)
        return JsonResponse(response_dict)


def wolf_search_debug_view(request):
    if request.method == 'GET':
        return render(request, 'wolf/wolf_searchd.html')
    elif request.method == 'POST':
        raw_input = request.POST['keywords']
        xml_str = request_wolf_kb(raw_input)
        response_dict = process_wolf_response(xml_str)
        pods_list = response_dict['pods']
        return render(request, 'wolf/wolf_resultd.html', {'pods': pods_list})


def wolf_search_combined_view(request):
    if request.method == 'GET':
        return render(request, 'wolf/wolf_search_combined.html')
    elif request.method == 'POST':
        raw_input = request.POST['keywords']
        xml_str = request_wolf_kb(raw_input)
        response_dict = process_wolf_response(xml_str)
        pods_list = response_dict['pods']
        # search result in database
        posts = Post.objects.all()
        ranked = rank_post(raw_input, posts)
        return render(request, 'wolf/wolf_result_combined.html', {'input': raw_input, 'ranked': ranked[:5], 'pods': pods_list})


def request_wolf_kb(keywords):
    params = {'appid': app_id, 'input': keywords}
    r = requests.get(wolf_base_url, params=params)
    return r.content


def process_wolf_response(xml_str):
    # print xml_str
    root = ElementTree.fromstring(xml_str)
    num_pods = int(root.attrib['numpods'])
    response_dict = {}
    pod_list = []
    for i in range(num_pods):
        cur_pod = root[i]
        title = cur_pod.attrib['title']
        subpod = cur_pod[0]
        img = subpod.find('img').attrib
        text = subpod.find('plaintext').text
        pod_list.append({'title': title, 'img': img, 'text': text})
    response_dict['pods'] = pod_list
    return response_dict




