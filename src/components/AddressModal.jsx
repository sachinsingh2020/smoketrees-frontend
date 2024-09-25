import React from 'react';
import Modal from 'react-modal';

const AddressModal = ({ isOpen, closeModal, addresses }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Addresses Modal"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    width: '300px',
                },
            }}
        >
            <h2>Addresses</h2>
            <ul>
                {addresses.map((address, index) => (
                    <li key={index}>{address}</li>
                ))}
            </ul>
            <button onClick={closeModal}>Close</button>
        </Modal>
    );
};

export default AddressModal;
