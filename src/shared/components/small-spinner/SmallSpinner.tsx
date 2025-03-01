
interface ISmallSpinner {
  diameter?: number;
}

export default function SmallSpinner({ diameter }: ISmallSpinner) {
  return (
    <div className='spinner-outer small-spinner-outer'>
      <div className="spinner-inner small-spinner-inner" style={{ width: diameter, height: diameter }} />
    </div>
  );
}