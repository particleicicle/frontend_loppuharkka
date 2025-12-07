import { useAppState, capitalizeString } from "../main.jsx"
import { Form } from 'react-bootstrap'

const allCoursesValue = "all"

function CourseDropdown({includeAllCoursesOption = true, selectedCourse, handleSelectedCourse}) {
    const courses = useAppState((state) => state.courses)
    const dropdownItems = []

    if (includeAllCoursesOption) dropdownItems.push(<option value={allCoursesValue} key={allCoursesValue}>All courses</option>)

    for (let i = 0; i < courses.length; ++i) {
        const courseName = courses[i].name
        dropdownItems.push(
            <option value={courseName} key={courseName}>
                {capitalizeString(courseName)}
            </option>
        )
    }

    return <>
        <Form.Select id="course-select" value={selectedCourse} onChange={handleSelectedCourse}>
            {dropdownItems}
        </Form.Select>
    </>
}

export default CourseDropdown;