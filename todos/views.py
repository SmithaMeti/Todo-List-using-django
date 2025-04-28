from django.shortcuts import render, redirect, get_object_or_404
from .models import Todo
from django.views.decorators.http import require_POST
from django.http import JsonResponse
import json
# Create your views here.
def todo_list(request):
    todos = Todo.objects.all()
    return render(request,'index.html',{'todos':todos})

def add_todo(request):
    if request.method == 'POST':
        title = request.POST['title']
        description = request.POST['description']

        # if not title:
        #     print('Title cannot be empty...!!!')
        #     return render(request,'add_todo.html',{'error':'Title is required','title':title,'description':description})

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
        return redirect('todo_list')
    else:
        return render(request,'update.html',{'todos':todos})
    

def delete_todo(request,pk):
    todos = Todo.objects.get(id=pk)
    # if request.method == 'POST'
    todos.delete()
    return redirect('todo_list')

@require_POST 
def toggle_complete(request, pk):
    """
    View to toggle the 'completed' status of a Todo item.
    Expects a POST request with JSON body {'completed': true/false}.
    """
    todo = Todo.objects.get(id=pk)
        # Parse the JSON body of the request
    data = json.loads(request.body)
    is_completed = data.get('completed')
    if is_completed is not None:
        todo.completed = is_completed
        todo.save()
            # Return a success JSON response
        return JsonResponse({'status': 'success', 'completed': todo.completed})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid data provided'}, status=400)

