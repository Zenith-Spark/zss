'use client';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PiGreaterThan } from 'react-icons/pi';
import { adminDBSidebar } from '@assets/app/components/resuables/index';
import { LoaderOne } from '@assets/app/components/resuables/Loader/Loader';

const NetworksPage = () => {
    const [networks, setNetworks] = useState([]); // State for networks list
    const [formType, setFormType] = useState('create'); // To track form mode (create/edit)
    const [selectedNetwork, setSelectedNetwork] = useState(null); // State for the selected network to edit
    const [networkForm, setNetworkForm] = useState({
        name: '',
        symbol: '',
        wallet_address: '',
    }); // Form state for new or edited network
    const [isLoading, setIsLoading] = useState(false); // Loading state for form submission button
    const [loadingNetworks, setLoadingNetworks] = useState(false); // Loading state for fetching networks
    const formRef = useRef(null); // Reference for the form section

    const token = localStorage.getItem('AdminAuthToken') || sessionStorage.getItem('AdminAuthToken');

    // Fetch all networks on component mount
    const fetchNetworks = async () => {
        if (!token) {
            toast.error('No authentication token found', { position: "top-right", autoClose: 3000 });
            return;
        }

        setLoadingNetworks(true); // Set loading state when fetching networks
        try {
            const response = await axios.get('https://zss.pythonanywhere.com/api/v1/networks/', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNetworks(response.data);
            toast.success('Networks fetched successfully.', { position: "top-right", autoClose: 3000 });
        } catch (error) {
            console.error('Error fetching networks:', error);
            toast.error('Failed to fetch networks: ' + (error.response?.data?.message || error.message), { position: "top-right", autoClose: 3000 });
        } finally {
            setLoadingNetworks(false); // Reset loading state after fetch completes
        }
    };

    useEffect(() => {
        fetchNetworks(); // Fetch networks when the component mounts
    }, [token]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNetworkForm((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission for creating or updating networks
   // Handle form submission for creating or updating networks
const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
        toast.error('No authentication token found', { position: "top-right", autoClose: 3000 });
        return;
    }

    setIsLoading(true); // Set loading to true when submitting form

    // Modify networkForm.name before submitting
    const formattedName = typeof networkForm.name === 'string' 
    ? networkForm.name.toLowerCase().replace(/\s+/g, '-') 
    : '';
  
    const formData = { ...networkForm, name: formattedName };

    try {
        if (formType === 'create') {
            await axios.post('https://zss.pythonanywhere.com/api/v1/networks/', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Network created successfully.', { position: "top-right", autoClose: 3000 });
        } else if (formType === 'edit' && selectedNetwork) {
            await axios.patch(
                `https://zss.pythonanywhere.com/api/v1/networks/${encodeURIComponent(selectedNetwork.name)}/`,
                { wallet_address: networkForm.wallet_address }, // Only send wallet_address in patch
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Network updated successfully.', { position: "top-right", autoClose: 3000 });
        }

        // Refetch networks after successful create/update
        fetchNetworks();

        // Reset the form fields and form state
        setNetworkForm({ name: '', symbol: '', wallet_address: '' });
        setFormType('create');
        setSelectedNetwork(null);
    } catch (error) {
        console.error('Error saving network:', error);
        toast.error('Failed to save network: ' + (error.response?.data?.message || error.message), { position: "top-right", autoClose: 3000 });
    } finally {
        setIsLoading(false); // Reset loading state after form submission
    }
};


    // Prepare the form for editing a network and scroll to the form section
    const handleEdit = (network) => {
        setFormType('edit');
        setSelectedNetwork(network);
        setNetworkForm({ wallet_address: network.wallet_address }); // Only set wallet_address for editing

        // Scroll to the form section for editing
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className='py-16 w-full h-auto'>
            <p className="flex flex-row gap-2 items-center text-lg pb-4 font-thin px-6 pt-4">
                <span>{adminDBSidebar[4].icons}</span>
                <span><PiGreaterThan /></span>
                <span>{adminDBSidebar[4].name}</span>
            </p>

            <h2 className="text-2xl font-bold text-center mb-4">Manage Networks</h2>

            {/* Form for creating or editing a network */}
            <section ref={formRef} className="shadow-md p-6 mb-6 max-w-md mx-auto rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{formType === 'create' ? 'Create New Network' : 'Edit Network'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {formType === 'create' && (
                        <>
                            <div className="mb-4">
                                <label className="block" htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={networkForm.name}
                                    onChange={handleChange}
                                    required
                                    className="border-b bg-transparent focus:border-blue-600 p-3 w-full max-w-xs focus:outline-none transition duration-200 ease-in-out"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block" htmlFor="symbol">Symbol</label>
                                <input
                                    type="text"
                                    name="symbol"
                                    id="symbol"
                                    value={networkForm.symbol}
                                    onChange={handleChange}
                                    required
                                    className="border-b bg-transparent focus:border-blue-600 p-3 w-full max-w-xs focus:outline-none transition duration-200 ease-in-out"
                                />
                            </div>
                        </>
                    )}
                    <div className="mb-4">
                        <label className="block" htmlFor="wallet_address">Wallet Address</label>
                        <input
                            type="text"
                            name="wallet_address"
                            id="wallet_address"
                            value={networkForm.wallet_address}
                            onChange={handleChange}
                            required
                            className="border-b bg-transparent focus:border-blue-600 p-3 w-full max-w-xs focus:outline-none transition duration-200 ease-in-out"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className={`bg-blue-500 rounded-lg text-white px-6 py-3 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? (<LoaderOne fill={'#ffffff'}/>) : formType === 'create' ? 'Create Network' : 'Update Network'}
                    </button>
                </form>
            </section>

            {/* Display existing networks */}
            <h3 className="text-xl font-semibold mb-4 w-full">Existing Networks</h3>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loadingNetworks ? (
                    <p>Loading networks...</p>
                ) : networks.length === 0 ? (
                    <p>No networks available.</p>
                ) : (
                    networks.map((network, index) => (
                        <div key={network.id || `${network.name}-${index}`} className="shadow-md p-6 rounded-lg">
                            <h4 className="text-lg font-bold">{network?.name || '(No Name)'} ({network?.symbol || ''})</h4>
                            <p><strong>Wallet:</strong> {network?.wallet_address || '(No Wallet Address)'}</p>
                            <button onClick={() => handleEdit(network)} className="text-blue-500 hover:underline mt-4">Edit</button>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
};

export default NetworksPage;
