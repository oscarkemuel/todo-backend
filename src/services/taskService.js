import GenericRepository from "../repository/genericRepository.js";
import TaskRepository from "../repository/taskRepository.js"

export default class TaskService {
    genericRepository;
    taskRepository;

    constructor() {
        this.genericRepository = new GenericRepository();
        this.taskRepository = new TaskRepository();
    }

    async list(){
        let data = null;
        try {
            data = await this.genericRepository.list("task");
        } catch (err){
            console.log(err);
        }
        return data;
    }

    async getById(id){
        let data = null;
        
        try {
            data = await this.genericRepository.getById("task", id);
        } catch(err){
            console.log(err);
        }
        return data;
    }

    async create(payload) {
        let data = null;

        try {
            data = await this.taskRepository.createTask(payload.name, payload.description, payload.tag);
        } catch(err){
            console.log(err);
        }

        return data;
    }
}
