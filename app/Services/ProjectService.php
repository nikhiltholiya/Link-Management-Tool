<?php

namespace App\Services;

use App\Models\Project;
use App\Models\QRCode;
use Illuminate\Support\Facades\DB;

class ProjectService
{
   function getProject(int|string $id)
   {
      return DB::transaction(function () use ($id) {
         return Project::with(['qrcodes' => function ($query) {
            $query->orderBy('created_at', 'desc');
         }])->find($id);
      }, 5);
   }


   function getProjects(array|null $data = null)
   {
      return DB::transaction(function () use ($data) {
         $user = app('user');

         return Project::query()
            ->where('user_id', $user->id)
            ->when($data, function ($query) use ($data) {
               return $query->select($data);
            })->get();
      }, 5);
   }


   function getPaginatedProjects(array|null $data = null)
   {
      return DB::transaction(function () use ($data) {
         $user = app('user');
         $SA = $user->hasRole('SUPER-ADMIN');
         $page = array_key_exists('per_page', $data) ? intval($data['per_page']) : 10;

         return Project::when(!$SA, function ($query) use ($user) {
            return $query->where('user_id', $user->id);
         })
            ->when(array_key_exists('search', $data), function ($query) use ($data) {
               return $query->where('project_name', 'LIKE', '%' . $data['search'] . '%');
            })
            ->orderBy('created_at', 'desc')
            ->with('qrcodes')
            ->paginate($page);
      }, 5);
   }


   public function createProject(array $data)
   {
      DB::transaction(function () use ($data) {
         Project::create($data);
      }, 5);
   }


   public function updateProject(int|string $id, array $data)
   {
      DB::transaction(function () use ($data, $id) {
         Project::find($id)->update($data);
      }, 5);
   }


   public function deleteProject(int|string $id)
   {
      DB::transaction(function () use ($id) {
         $project = Project::find($id);

         if ($project->qrcode_id) {
            QRCode::where('id', $project->qrcode_id)->delete();
         }

         $project->delete();
      }, 5);
   }
}
