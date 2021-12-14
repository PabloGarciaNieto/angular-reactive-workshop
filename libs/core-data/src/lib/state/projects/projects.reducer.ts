import { Project } from './../../projects/project.model';
import { ProjectsActionsTypes } from './projects.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';


export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Project One',
    details: 'This is a sample project',
    percentComplete: 20,
    approved: false,
    customerId: null
  },
  {
    id: '2',
    title: 'Project Two',
    details: 'This is a sample project',
    percentComplete: 40,
    approved: false,
    customerId: null
  },
  {
    id: '3',
    title: 'Project Three',
    details: 'This is a sample project',
    percentComplete: 100,
    approved: true,
    customerId: null
  }
];

const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);

//01 Define the shape of my state using the library Entity
export interface ProjectsState extends EntityState<Project> {
  selectedProjectId: string | null;
}

//02 Create entity adapter
export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

//03 Define the initial state
export const initialState: ProjectsState = adapter.getInitialState({
  selectedProjectId: null
});

//03 Build a reducer
export function projectsReducers(state = initialState, action): ProjectsState {
  switch (action.type) {
    case ProjectsActionsTypes.ProjectSelected:
      return Object.assign({}, state, { selectedProjectId: action.payload });
    case ProjectsActionsTypes.LoadProjects:
      return adapter.addMany(action.payload, state);
    case ProjectsActionsTypes.AddProject:
      return adapter.addOne(action.payload, state);
    case ProjectsActionsTypes.UpdateProject:
      return adapter.updateOne(action.payload, state);
    case ProjectsActionsTypes.DeleteProject:
      return adapter.removeOne(action.payload, state);
    default:
      return state;
  };
}

//Selectors 
export const getSelectedProjectId = (state: ProjectsState) => state.selectedProjectId;

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const selectProjectIds = selectIds;
export const selectProjectEntities = selectEntities;
export const selectAllProjects = selectAll;