const PersonForm = ({name, number, nameChange, numberChange, onSubmit}) => {
    return (
      <form>
        <div>
          name: <input value={name} onChange={nameChange} />
        </div>
        <div>
          number: <input value={number} onChange={numberChange} />
        </div>
        <div>
          <button type="submit" onClick={onSubmit}>add</button>
        </div>
      </form>
    )
}

export default PersonForm