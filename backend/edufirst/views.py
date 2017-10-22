import logging
import os
from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View
from edufirst.settings import REACT_APP_DIR


def debug_homeview(request):
    return render(request, 'debug-base.html')


def integration_test_view(request):
    return render(request, 'index.html')


class FrontendAppView(View):
    def get(self, request):
        try:
            with open(os.path.join(REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except Exception:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )
