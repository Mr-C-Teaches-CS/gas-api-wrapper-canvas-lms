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
    .addMethod('getGradingStandards', {
      method: 'GET',
      path: '/courses/{{courseId}}/grading_standards'
    })
    .addMethod('getModuleItems', {
      method: 'GET',
      path: '/courses/{{courseId}}/modules/{{moduleId}}/items?per_page=100'
    })
    .addMethod('getModules', {
      method: 'GET',
      path: '/courses/{{courseId}}/modules?per_page=100{{include}}'
    })
    .addMethod('getSection', {
      method: 'GET',
      path: '/courses/{{courseId}}/sections/{{sectionId}}?per_page=100&include[]=students'
    })
    .addMethod('getSections', {
      method: 'GET',
      path: '/courses/{{courseId}}/sections?per_page=100&include[]=students'
    })
    .addMethod('getSubmission', {
      method: 'GET',
      path: '/courses/{{courseId}}/assignments/{{assignmentId}}/submissions/{{userId}}'
    })
    .addMethod('getSubmissions', {
      method: 'GET',
      path: '/courses/{{courseId}}/assignments/{{assignmentId}}/submissions?include[]=submission_comments&per_page=100'
    })
    .addMethod('getUsersInCourse', {
      method: 'GET',
      path: 'courses/{{courseId}}/users?per_page=100'
    })
    .addMethod('setGradeAndComment', {
      method: 'PUT',
      path: '/courses/{{courseId}}/assignments/{{assignmentId}}/submissions/{{userId}}',
      queryParams: {
        'submission[posted_grade]': '{{grade}}',
        'comment[text_comment]': '{{comment}}'
      }
    })
    .addMethod('updateAssignment', {
      method: 'PUT',
      path: '/courses/{{courseId}}/assignments/{{assignmentId}}',
      queryParams: {
        'assignment[published]': '{{isPublished}}',
        'assignment[name]': '{{title}}',
        'assignment[description]': '{{desc}}',
        'assignment[submission_types]': '{{submissionTypes}}',
        'assignment[points_possible]': '{{pointsPossible}}',
        // 'assignment[grading_type]': '{{gradingType}}',
        'assignment[due_at]': '{{dueAt}}',
        // 'assignment[grading_standard_id]]': '{{gradingStandardId}}', 
        'assignment[omit_from_final_grade]': '{{omitFromFinalGrade}}' 
        
      }
    })
    .addMethod('updateAssignmentOverride', {
      method: 'PUT',
      path: '/courses/{{courseId}}/assignments/{{assignmentId}}/overrides/{{overrideId}}?assignment_override[due_at]={{formattedDate}}'
    })
    .addMethod('createAssignment', {
      method: 'POST',
      path: '/courses/{{courseId}}/assignments',
      queryParams: {
        'assignment[published]': '{{isPublished}}',
        'assignment[name]': '{{title}}',
        'assignment[description]': '{{desc}}',
        'assignment[submission_types]': '{{submissionTypes}}',
        'assignment[points_possible]': '{{pointsPossible}}',
        'assignment[grading_type]': '{{gradingType}}',  
        'assignment[due_at]': '{{dueAt}}',
        'assignment[assignment_group_id]': '{{assignmentGroup}}',
        // 'assignment[grading_standard_id]]': '{{gradingStandardId}}', 
        'assignment[omit_from_final_grade]': '{{omitFromFinalGrade}}' 
      }
    })
    .addMethod('createAssignmentOverride', {
      method: 'POST',
      path: '/courses/{{courseId}}/assignments/{{assignmentId}}/overrides',
      queryParams: {
        'assignment_override[course_section_id]': '{{courseSectionId}}',
        'assignment_override[title]': '{{title}}', 
        'assignment_override[due_at]': '{{dueAt}}'
      }
    })
    .addMethod('createModuleItem', {
      method: 'POST',
      path: '/courses/{{courseId}}/modules/{{moduleId}}/items',
      queryParams: {
        'module_item[content_id]': '{{contentId}}',
        'module_item[title]': '{{title}}',
        'module_item[type]': '{{type}}'        
      }
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
 
  createAssignment(courseId, assignment){
    const moduleId = assignment.moduleId;
    const newAssignment = this.api.createAssignment({
      courseId: courseId,
      assignmentGroup: assignment.assignmentGroupId,
      title: assignment.title,
      desc: encodeURIComponent(assignment.desc),
      isPublished: assignment.isPublished,
      sumissionTypes: assignment.submissionTypes,
      pointsPossible: assignment.pointsPossible,
      gradingType: assignment.gradingType,
      // assignment[grading_standard_id]   
      });
    // create module item
    this.api.createModuleItem({
      courseId: courseId,
      title: newAssignment.name,
      type: "Assignment",
      contentId: newAssignment.id,
      moduleId: parseInt(moduleId)
    })

    assignment.assignmentId = newAssignment.id;
    return assignment;


  }

  createAssignmentOverride(assignment, courseSectionId, dueAt){
    const response = this.api.createAssignmentOverride({
      courseSectionId: courseSectionId,
      title: assignment.title,
      dueAt: dueAt,
      courseId: assignment.courseId,
      assignmentId: assignment.assignmentId
    });
    return response.id;
  }

  getCourse(courseId){
    return this.api.getCourses({courseId: courseId});
  }

  getCourses(){ 
    return this.api.getCourses(); 
  }

  getGradingStandards(courseId){
    return this.api.getGradingStandards({courseId: courseId}); 
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

  getSubmission(courseId, assignmentId, userId){
    return this.api.getSubmission({courseId: courseId, assignmentId: assignmentId, userId: userId});
  }

  getSubmissions(courseId, assignmentId){
    return this.api.getSubmissions({courseId: courseId, assignmentId: assignmentId});
  }

  getModuleItems(courseId, moduleId){
    return this.api.getModuleItems({courseId: courseId, moduleId: moduleId});
  }

  getModules(courseId){
    return this.api.getModules({courseId: courseId, include: ""});
  }

  getModulesWithItems(courseId){
    return this.api.getModules({courseId: courseId, include: "&include[]=items"});
  }

  getSections(courseId){
    return this.api.getSections({courseId: courseId});
  }

  getSectionsJSON(courseId){
    const response = this.api.getSections({courseId: courseId});
    const object = {}
    response.forEach(section => {
      section.students.forEach(student => {
        object[student.id] = `${section.name} ${section.id}`;
      });
    });
    return object;
  }

  getUsersInCourseJSON(courseId){
    const response = this.api.getUsersInCourse({courseId: courseId});
    const object = {};
    response.forEach(student => {
      object[parseInt(student.id)] = student.sortable_name + " " + student.id;
    })

    return object;

  }


  setGrade(courseId, assignmentId, userId, grade){
    this.api.setGradeAndComment({courseId: courseId, assignmentId: assignmentId, userId: userId, grade: grade})
  }

  setGradeAndComment(courseId, assignmentId, userId, grade, comment){
    this.api.setGradeAndComment({courseId: courseId, assignmentId: assignmentId, userId: userId, grade: grade, comment: comment})
  }

  updateAssignment(courseId, assignmentId, assignment){
    // const path = `/courses/${courseId}/assignments/${assignmentId}?assignment[description]=${encodeURIComponent(assignment.desc)}`;
    // this.updateAssignmentManual(path);
    return this.api.updateAssignment({
      courseId: courseId, 
      assignmentId: assignmentId,
      assignmentGroup: assignment.assignmentGroupId,
      title: assignment.title,
      desc: encodeURIComponent(assignment.desc),
      isPublished: assignment.isPublished,
      submissionTypes: assignment.submissionTypes,
      pointsPossible:  assignment.pointsPossible,
      gradingType: assignment.gradingType,
      // gradingStandardId: assignment.grading_standard_id,
      omitFromFinalGrade: assignment.omitFromFinalGrade
      });
  }

  updateAssignmentOverride(assignment, overrideId, formattedDate){
    return this.api.updateAssignmentOverride({
      courseId: assignment.courseId, 
      assignmentId: assignment.assignmentId, 
      overrideId: overrideId, 
      formattedDate: formattedDate});
  }

}

/**
 * Returns an instance of the Canvas API wrapper object to use for development
 * @param {string} url base url of your instance of Canvas, e.g. 'https://myschool.instructure.com'
 * @param {string} token user-generated Canvas access token
 * @return {CanvasAPI} an instance of the Canvas API wrapper object
 */
function getCanvasAPI(url, token){
  return new CanvasAPI(url, token);
}