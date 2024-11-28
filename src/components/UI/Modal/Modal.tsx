import Backdrop from '../Backdrop/Backdrop.tsx';

interface Props extends React.PropsWithChildren{
    show: boolean;
    title?: string;
    closeModal: () => void;
    defaultModalBtn?: boolean;
}

const Modal: React.FC<Props> = ({show, title = 'Modal title', children, closeModal, defaultModalBtn = true}) => {

    return (
        <>
            <Backdrop show={show} onClick={closeModal}/>
            <div className="modal show" style={{display: show ? 'block' : 'none', width: "500px", position: 'fixed', top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} >
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header justify-content-end">
                            <h1 className="modal-title fs-5 me-auto">{title}</h1>
                            <div>{defaultModalBtn ?
                                <button onClick={closeModal} className="btn ms-auto" type="button">x</button> : null}</div>
                        </div>
                        <div className="p-2">
                            {children}
                        </div>
                        <div className="modal-footer">

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;