import React, { useState } from 'react';
import Modal from 'react-modal';

const NewDataModal = ({
    isOpen,
    closeNewDataModal,
    existingUser,
    setExistingUser,
    newUserName,
    setNewUserName,
    newUserAddress,
    setNewUserAddress,
    handleAddNewData,
    data
}) => {
    const [userType, setUserType] = useState('');

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeNewDataModal}
            contentLabel="Add New Data Modal"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    width: '400px',
                },
            }}
        >
            <h2>Add New Data</h2>

            <div>
                <label>
                    <input
                        type="radio"
                        value="new"
                        checked={userType === 'new'}
                        onChange={() => {
                            setUserType('new');
                            setExistingUser('');
                            setNewUserName('');
                        }}
                    />
                    New User
                </label>
                <label>
                    <input
                        type="radio"
                        value="existing"
                        checked={userType === 'existing'}
                        onChange={() => {
                            setUserType('existing');
                            setNewUserName('');
                        }}
                    />
                    Existing User
                </label>
            </div>

            {userType === 'new' && (
                <div>
                    <label>
                        New User Name:
                        <input
                            type="text"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                        />
                    </label>
                </div>
            )}

            {userType === 'existing' && (
                <div>
                    <label>
                        Existing User:
                        <select
                            value={existingUser}
                            onChange={(e) => setExistingUser(e.target.value)}
                        >
                            <option value="">Select User</option>
                            {data.map((item) => (
                                <option key={item.name} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            )}

            <div>
                <label>
                    Address:
                    <input
                        type="text"
                        value={newUserAddress}
                        onChange={(e) => setNewUserAddress(e.target.value)}
                    />
                </label>
            </div>

            <button onClick={handleAddNewData} style={{ marginTop: '10px' }}>
                Submit
            </button>
            <button onClick={closeNewDataModal} style={{ marginTop: '10px', marginLeft: '10px' }}>
                Cancel
            </button>
        </Modal>
    );
};

export default NewDataModal;
