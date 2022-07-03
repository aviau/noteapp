import { useState } from 'react';

interface Props {
  name: string;
}

export default function HelloWorld({ name }: Props) {
  const [enabled, setEnabled] = useState<boolean>(false);

  const doSomething = () => {
    setEnabled(!enabled);
  };

  return (
    <div>
      <h2>Salut {name}</h2>
      <button type="button" onClick={doSomething}>
        {enabled.toString()}
      </button>
      <p>Enabled: {enabled.toString()}</p>
    </div>
  );
}
