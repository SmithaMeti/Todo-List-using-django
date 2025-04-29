from django.shortcuts import render, redirect
from .models import Todo
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
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
        return redirect('details', pk=todos.pk)
    else:
        return render(request,'update.html',{'todos':todos})
    

def delete_todo(request,pk):
    todos = Todo.objects.get(id=pk)
    # if request.method == 'POST'
    todos.delete()
    return redirect('todo_list')

# @require_POST 
# def toggle_complete(request, pk):
#     todo = Todo.objects.get(id=pk)
#         # Parse the JSON body of the request
#     data = json.loads(request.body)
#     print(data)
#     is_completed = data.get('completed')
#     print(is_completed)
#     if is_completed is not None:
#         todo.completed = is_completed
#         todo.save()
#             # Return a success JSON response
#         return JsonResponse({'status': 'success', 'completed': todo.completed})
#     else:
#         return JsonResponse({'status': 'error', 'message': 'Invalid data provided'}, status=400)


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

