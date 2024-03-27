import { HeaderProps, ContentProps, TotalProps, CoursePart, PartProps } from "./types";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  courseParts.forEach((part)=> {
    switch (part.kind) {
      case 'basic':
        console.log(part.name, part.description, part.exerciseCount);
        break;
      case 'group':
        console.log(part.name, part.groupProjectCount, part.exerciseCount);
        break;
      case 'background':
        console.log(part.name, part.description, part.backgroundMaterial, part.exerciseCount);
        break;
      case 'special':
        console.log(part.name, part.exerciseCount, part.description, part.requirements);
        break;
      default:
        return assertNever(part);
    }
  })


  return (
    <div>
      <Header title={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Header = (props: HeaderProps) => {
  return <h1>{props.title}</h1>
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part part={part} key={part.name}/>
      ))}
    </>
  );
}

const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.total}</p>
}

const Part = (props: PartProps) => {
  const { part }:PartProps = props;

  return (
    <p>
      {part.name} {part.exerciseCount} <br/>

      {(() => {
        switch (part.kind) {
          case 'basic':
            return <i>{part.description}</i>;
          case 'group':
            return <i>project exercises {part.groupProjectCount}</i>;
          case 'background':
            return <i>{part.description} <br/> {part.backgroundMaterial}</i>;
          case 'special':
            return <i>{part.description} <br/> required skills: {part.requirements.join(', ')}</i>;
          default:
            assertNever(part)
        }
      })()}
    </p>
  )
}

export default App;