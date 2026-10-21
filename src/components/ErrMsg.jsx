export default function ErrMsg({ id, pesan }) {
  return (
    <p className={`err ${pesan ? "" : "hidden"}`} id={id} role="alert">
      {pesan || ""}
    </p>
  );
}
