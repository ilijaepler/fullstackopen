import Part from "./Part"

const Content = (props) => {
    return (
        <>
           <Part part={props.part} exercises={props.exercises}/>
        </>
    )
}

export default Content