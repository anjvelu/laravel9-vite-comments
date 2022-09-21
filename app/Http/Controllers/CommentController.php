<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function Index()
    {
        return Inertia::render(
            'Dashboard',
            [
                'comment' => Comment::with(['admin', 'customer'])->latest()->get()->map(fn ($item) => [
                    'id' => $item->id,
                    'description' => $item->description,
                    'is_admin' => boolval($item->admin_id),
                    'name' => $item->customer ? $item->customer->getName() : $item->admin->getName(),
                    'created_at' => $item->created_at->format('d/m/Y')
                ])
            ]
        );
    }

    public function store(CommentRequest $request)
    {

        $userArr = ['created_at' => now()];
        if (auth('admin')->check()) {
            $userArr['admin_id'] = auth('admin')->id();
        } else {
            $userArr['user_id'] = auth()->id();
        }

        $comment = auth()->user()->comments()->create(array_merge($request->validated(), $userArr));
        return response()->json([
            'message' => "New Comment created successfully",
            'data' => [
                'id' => $comment->id,
                'description' => $comment->description,
                'is_admin' => boolval($comment->admin_id),
                'name' => auth()->user()->getName(),
                'created_at' => $comment->created_at->format('d/m/Y')
            ]
        ]);
    }
}
