export default function Toast({ message, type }) {
    return (
        <div className={`toast toast-top toast-end ${message ? 'toast-shown' : 'toast-hidded'}`}>
            <div className={`alert alert-${type}`}>
                <span>{message}</span>
            </div>
        </div>
    );
}
