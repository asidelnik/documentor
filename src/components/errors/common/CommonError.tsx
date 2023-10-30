import c from './CommonError.module.scss';
type CommonErrorProps = {
  errorMessage: string;
};
export default function CommonError({ errorMessage }: CommonErrorProps) {
  return (
    <>
      {errorMessage && (
        <div className={c.container}>
          <h2>Error</h2>
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  )
}