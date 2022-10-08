class CanvasAPI{

  constructor(url, token){
    this.api = this.api(url, token);
  }

  api(url, token){
    return new APIWrapperBuilder(url,
      {
        type: 'Bearer',
        token: token,
      }
    )
    .addMethod('getActiveStudents', {
      method: 'GET',
      path: '/courses/{{courseId}}/enrollments?type[]=StudentEnrollment&state[]=active&per_page=100'
    })
    .addMethod('getAssignment', {
      method: 'GET',
      path: '/courses/{{courseId}}/assignments/{{assignmentId}}?include[]=overrides'
    })
    .addMethod('getAssignments', {
      method: 'GET',
      path: '/courses/{{courseId}}/assignments?per_page=100'
    })
    .addMethod('getAssignmentGroups', {
      method: 'GET',
      path: '/courses/{{courseId}}/assignment_groups?per_page=100'
    })
    .addMethod('getAssignmentOverride', {
      method: 'GET',
      path: '/courses/{{courseId}}/assignments/{{assignmentId}}/overrides/{{overrideId}}'
    })
    .addMethod('getAssignmentOverrides', {
      method: 'GET',
      path: '/courses/{{courseId}}/assignments/{{assignmentId}}/overrides'
    })
    .addMethod('getCourse', {
      method: 'GET',
      path: '/courses/{{courseId}}'
    })
    .addMethod('getCourses', {
      method: 'GET',
      path: '/courses'
    })
    .addMethod('getEnrollmentTerms', {
      method: 'GET',
      path: '/accounts/self/terms'
    })
    .addMethod('getModuleItems', {
      method: 'GET',
      path: '/courses/{{courseId}}/modules/{{moduleId}}/items'
    })
    .addMethod('getModules', {
      method: 'GET',
      path: '/courses/{{courseId}}/modules?per_page=100{{include}}'
    })
    .addMethod('getSections', {
      method: 'GET',
      path: '/courses/{{courseId}}/sections'
    })
    .addMethod('getSubmission', {
      method: 'GET',
      path: '/courses/{{courseId}}/assignments/{{assignmentId}}/submissions/{{userId}}'
    })
    .addMethod('getSubmissions', {
      method: 'GET',
      path: '/courses/{{courseId}}/assignments/{{assignmentId}}/submissions'
    })
    .addMethod('getAllUsers', {
      method: 'GET',
      path: '/accounts?per_page=100'
    })
    .addMethod('getUsersCourses', {
      method: 'GET',
      path: '/users/sis_user_id:STU-{{schoolId}}/courses?include[]=total_scores&per_page=100'
    })
    .addMethod('setGrade', {
      method: 'PUT',
      path: '/courses/{{courseId}}/assignments/{{assignmentId}}/submissions/{{userId}}?submission[posted_grade]={{grade}}'
    })
    .build();
  }

  getActiveStudents(courseId){
    return this.api.getActiveStudents({courseId: courseId});
  }

  getAssignment(courseId, assignmentId){
    const response = this.api.getAssignment({
      courseId: courseId,
      assignmentId: assignmentId
      });
    return response;
  }

  getAssignments(courseId){
    return this.api.getAssignments({courseId: courseId});
  }

  getCourse(courseId){
    return this.api.getCourses({courseId: courseId});
  }

  getCourses(){ 
    return this.api.getCourses(); 
  }

  getAssignmentGroups(courseId){
    return this.api.getAssignmentGroups({courseId: courseId});
  }

  getAssignmentOverride(courseId, assignmentId, overrideId){
    return this.api.getAssignmentOverrides({
      courseId: courseId, 
      assignmentId: assignmentId,
      overrideId: overrideId
      });
  }

  getAssignmentOverrides(courseId, assignmentId){
    return this.api.getAssignmentOverrides({courseId: courseId, assignmentId: assignmentId});
  }

  getEnrollmentTerms(){
    return this.api.getEnrollmentTerms();
  }

  getSubmission(courseId, assignmentId, userId){
    return this.api.getSubmission({courseId: courseId, assignmentId: assignmentId, userId: userId});
  }

  getSubmissions(courseId, assignmentId){
    return this.api.getSubmissions({courseId: courseId, assignmentId: assignmentId});
  }

  getModuleItems(courseId, moduleId){
    return this.api.getModuleItems({courseId: courseId, moduleId: moduleId});
  }

  getModules(courseId, withItems){
    let include = "";
    if(withItems){
      include = "&include[]=items";
    }
    return this.api.getModules({courseId: courseId, include: include});
  }

  getSections(courseId){
    return this.api.getSections({courseId: courseId});
  }

  getAllUsers(){
    return this.api.getAllUsers();
  }

  getUsersCourses(schoolId){
    return this.api.getUsersCourses({schoolId: schoolId});
  }

  setGrade(courseId, assignmentId, userId, grade){
    this.api.setGrade({courseId: courseId, assignmentId: assignmentId, userId: userId, grade: grade})
  }

}

function getCanvasAPI(url, token){
  return new CanvasAPI(url, token);
}