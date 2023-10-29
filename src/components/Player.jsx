import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setEdit] = useState(false);

  let buttonTitle = isEditing ? "Save" : "Edit";

  function handleClick() {
    setEdit((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  function handleChange(event) {
    console.log(event);
    setPlayerName(event.target.value);
  }

  let editablePlayerName = isEditing ? (
    <input type="text" required value={playerName} onChange={handleChange} />
  ) : (
    <span className="player-name">{playerName}</span>
  );

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
        <button onClick={handleClick}>{buttonTitle}</button>
      </span>
    </li>
  );
}
