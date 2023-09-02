# Google Apps Script API Wrapper for Canvas LMS

This is an API wrapper for [Canvas by Instructure](https://www.instructure.com/) that allows you to pull information from your instance of Canvas into a Google Sheet or other Google Workspace document.

## About

I work with Canvas LMS a lot, but at times ind it tendious to have to click through to accomplish a task, especially when I need to do a lot of the same thing. In my experience, spreadsheets are a great place to make bulk changes to data and I'm familiar with them as are a lot of people. So would it be possible to make changes to Canvas from a Sheets?

Using [API Wrapper for Google Apps Script](https://github.com/WildH0g/gas-api-wrapper) along with [Canvas LMS API](https://canvas.instructure.com/doc/api/), I have built a ready to use bridge between Canvas and Google Workspace.

## Install

Option 1: [Add a library to your script project](https://developers.google.com/apps-script/guides/libraries#add_a_library_to_your_script_project) to your project using this Script ID: 
1iUYsznB1jws8zd1xtEuiFDoa_n4_8szvBl8WMPaueP80M6o78yAXoY4- 

Option 2: Copy the files from this repository into your project manually or using a tool like [Google Apps Script GitHub Assistant](https://chrome.google.com/webstore/detail/google-apps-script-github/lfjcgcmkmjjlieihflfhjopckgpelofo?hl=en)

## Usage

```js
function getCourses() {
  const baseUrl = "https://myschool.instructure.com";
  const token = <<user-generated Canvas token>>;
  const canvasApi = CanvasAPI.getCanvasAPI(baseUrl, token);
  const courses = canvasApi.getCourses();
  return courses;
}

```

1. Obtain the base URL for your Canvas instance and a [user-generated access token](https://community.canvaslms.com/t5/Admin-Guide/How-do-I-manage-API-access-tokens-as-an-admin/ta-p/89) from your account.
1. Call the getCanvasAPI() function from the library by passing the baseUrl and token as parameters and assign the resulting Canvas API object to a variable.
1. Use the Canvas API object to run any existing methods. See below for a list of the methods.

## Methods

  getActiveStudents(courseId)

  getAssignment(courseId, assignmentId)

  getAssignments(courseId)
 
  createAssignment(courseId, assignment)

  createAssignmentOverride(assignment, courseSectionId, dueAt)

  getCourse(courseId)

  getCourses()

  getGradingStandards(courseId)

  getAssignmentGroups(courseId)

  getAssignmentOverride(courseId, assignmentId, overrideId)

  getAssignmentOverrides(courseId, assignmentId)

  getSubmission(courseId, assignmentId, userId)

  getSubmissions(courseId, assignmentId)

  getModuleItems(courseId, moduleId)

  getModules(courseId)

  getModulesWithItems(courseId)

  getSections(courseId)

  getSectionsJSON(courseId)

  getUsersCourses(courseId)

  getUsersInCourseJSON(courseId)

  setGrade(courseId, assignmentId, userId, grade)

  setGradeAndComment(courseId, assignmentId, userId, grade, comment)

  updateAssignment(courseId, assignmentId, assignment)

  updateAssignmentOverride(assignment, overrideId, formattedDate)

