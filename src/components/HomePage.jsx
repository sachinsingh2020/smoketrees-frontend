import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import DataTable from './DataTable';
import AddressModal from './AddressModal';
import NewDataModal from './NewDataModal';
import FilterDropdown from './FilterDropdown';

Modal.setAppElement('#root');

const HomePage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newDataModalOpen, setNewDataModalOpen] = useState(false);
    const [selectedAddresses, setSelectedAddresses] = useState([]);
    const [filter, setFilter] = useState('');
    const [data, setData] = useState([]);

    const [existingUser, setExistingUser] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newUserAddress, setNewUserAddress] = useState('');

    useEffect(() => {
        axios.get('https://smotress-backend.vercel.app/api/v1/show')
            .then(response => {
                const users = response.data.users.map(user => ({
                    name: user.name,
                    addressCount: user.address.length,
                    addresses: user.address.map(addr => addr.address)
                }));
                setData(users);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleAddNewData = () => {
        const requestData = {
            name: existingUser || newUserName,
            address: newUserAddress
        };

        axios.post('https://smotress-backend.vercel.app/api/v1/add', requestData)
            .then(() => {
                fetchData();
                closeNewDataModal();
            })
            .catch(error => {
                console.error('Error adding new data:', error);
            });
    };

    // Fetch data after adding new entry
    const fetchData = () => {
        axios.get('https://smotress-backend.vercel.app/api/v1/show')
            .then(resp => {
                const users = resp.data.users.map(user => ({
                    name: user.name,
                    addressCount: user.address.length,
                    addresses: user.address.map(addr => addr.address)
                }));
                setData(users);
            })
            .catch(err => console.error('Error fetching data after adding new entry:', err));
    };

    const names = useMemo(() => {
        return ['All', ...new Set(data.map((item) => item.name))];
    }, [data]);

    const filteredData = useMemo(() => {
        if (filter === '' || filter === 'All') return data;
        return data.filter((item) => item.name === filter);
    }, [data, filter]);

    const openAddressModal = (addresses) => {
        setSelectedAddresses(addresses);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedAddresses([]);
    };

    const openNewDataModal = () => setNewDataModalOpen(true);
    const closeNewDataModal = () => {
        setNewDataModalOpen(false);
        setExistingUser('');
        setNewUserName('');
        setNewUserAddress('');
    };

    return (
        <div
            style={{
                padding: "0 20px",
            }}
        >
            <button onClick={openNewDataModal} style={{ marginBottom: '20px' }}>
                Add New Data
            </button>

            <FilterDropdown filter={filter} setFilter={setFilter} names={names} />

            <DataTable
                data={filteredData}
                openAddressModal={openAddressModal}
            />

            <AddressModal
                isOpen={modalIsOpen}
                closeModal={closeModal}
                addresses={selectedAddresses}
            />

            <NewDataModal
                isOpen={newDataModalOpen}
                closeNewDataModal={closeNewDataModal}
                existingUser={existingUser}
                setExistingUser={setExistingUser}
                newUserName={newUserName}
                setNewUserName={setNewUserName}
                newUserAddress={newUserAddress}
                setNewUserAddress={setNewUserAddress}
                handleAddNewData={handleAddNewData}
                data={data}
            />
        </div>
    );
};

export default HomePage;
