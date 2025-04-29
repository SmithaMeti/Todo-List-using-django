from django.shortcuts import render, redirect
from .models import Todo
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
# Create your views here.
def todo_list(request):
    filter_query = request.GET.get('q', '')
    if filter_query:
        todos = Todo.objects.filter(title__icontains = filter_query).order_by('-created_at')
    else:
        todos = Todo.objects.all().order_by('-created_at')

    return render(request, 'index.html', {
        'todos': todos,
        'filter': filter_query
    })


def add_todo(request):
    if request.method == 'POST':
        title = request.POST['title']
        description = request.POST['description']

        if not title:
            print('Title cannot be empty...!!!')
            return render(request,'add_todo.html',{'error':'Title is required','title':title,'description':description})
        new_todo = Todo(
            title = title, description = description
        )
        new_todo.save()
        return redirect('todo_list')
    else:
        return render(request,'add_todo.html')
    

def update_todo(request,pk):
    todos = Todo.objects.get(id=pk)
    if request.method == 'POST':
        new_title = request.POST['title']
        new_description = request.POST['description']

        todos.title = new_title
        todos.description = new_description
        todos.save()
        return redirect('details', pk=todos.pk)
    else:
        return render(request,'update.html',{'todos':todos})
    

def delete_todo(request,pk):
    todos = Todo.objects.get(id=pk)
    # if request.method == 'POST'
    todos.delete()
    return redirect('todo_list')


@require_POST 
def toggle_complete(request, pk):
    try:
        # Get the data sent via AJAX
        data = json.loads(request.body)
        todo = Todo.objects.get(pk=pk)

        # Update the 'completed' status in the database
        todo.completed = data.get("completed", False)
        todo.save()

        return JsonResponse({"success": True})
    except Todo.DoesNotExist:
        return JsonResponse({"error": "Todo not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def details(request,pk):
    todo = Todo.objects.get(id=pk)
    return render(request,'detail.html',{'todo':todo})

