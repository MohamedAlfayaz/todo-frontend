import React from 'react'
import { fetchTasks, addTask, updateTask, deleteTask } from '../api/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useTasks = () => {

    const queryClient = useQueryClient();

    const tasksQury = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    })

    const addMutation = useMutation({
        mutationFn: addTask,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
        }
    })

    const updateMutation = useMutation({
        mutationFn : updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
        }
    })

    const deleteMutation = useMutation({
        mutationFn : deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tasks']})
        }
    })

  return {
    ...tasksQury,
    addTask: addMutation.mutate,
    updateTask: updateMutation.mutate,
    deleteTask: deleteMutation.mutate
  }
}


