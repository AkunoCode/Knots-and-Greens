import { useEffect, useState, useRef } from 'react';
import Resizer from 'react-image-file-resizer'
import './Admin.css'
import axios from 'axios';

const URL_PATH = 'http://localhost:2003/products'
function Admin() {
    const [products, setProducts] = useState([]);
    const [_id, setId] = useState();
    const [imagePath, setImagePath] = useState("")
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState();
    const [qty, setQty] = useState();
    const [checkedValues, setCheckedValues] = useState([]);
    const inputRef = useRef();


    // Loading Data on first load of the page
    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        try {
            const response = await axios.get(URL_PATH)
            setProducts(response.data.result)
        } catch (error) {
            alert('An Error Occured While Loading the Contents')
        }
    }

    // Handling Checkbox Changes to get which box is checked
    const checkboxChange = (event) => {
        const checkboxValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setCheckedValues((prevCheckedValues) => [...prevCheckedValues, checkboxValue]);
        } else {
            setCheckedValues((prevCheckedValues) =>
                prevCheckedValues.filter((value) => value !== checkboxValue)
            );
        }
    };

    // Handling image changes that will resize the image using react-image-file-resizer and setimagepath to the base64 string
    const handleImageChange = (image) => {
        Resizer.imageFileResizer(
            image,
            260,
            360,
            "JPEG",
            99,
            0,
            (uri) => {
                setImagePath(uri);
            },
            "base64"
        );
    };



    // Creating new product
    const createProduct = async () => {
        try {
            const response = await axios.post(URL_PATH, {
                imagePath: imagePath,
                productName: productName,
                price: price,
                qty: qty,
                tags: checkedValues
            })
            console.log(response)
        } catch (error) {
            alert('An Error Occured While Creating Product')
        }
    }

    // Fill Inputs by getting the product information from the database matching the id
    const fillInputs = async (id) => {
        try {
            const response = await axios.get(`${URL_PATH}/${id}`)
            setImagePath(response.data.result.imagePath)
            setProductName(response.data.result.productName)
            setPrice(response.data.result.price)
            setQty(response.data.result.qty)
            setCheckedValues(response.data.result.tags)
            setId(response.data.result._id)
        } catch (error) {
            alert('An Error Occured While Loading the Contents')
        }
    }

    // Editing Product
    const editProduct = async (id) => {
        try {
            const response = await axios.put(`${URL_PATH}/${id}`, {
                imagePath: imagePath,
                productName: productName,
                price: price,
                qty: qty,
                tags: checkedValues
            })
            console.log(response)
        } catch (error) {
            alert('An Error Occured While Editing Product')
            console.log(error)
        }
    }

    // Deleting Product
    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`${URL_PATH}/${id}`)
            console.log(response)
        } catch (error) {
            alert('An Error Occured While Deleting Product')
        }
    }

    // Create or Edit Product
    const createOrEditProduct = () => {
        if (_id) {
            editProduct(_id);
            clearInputs();
        } else {
            createProduct();
            clearInputs();
        }
    }

    // Clear Inputs
    const clearInputs = () => {
        setImagePath("");
        setProductName("");
        setPrice("");
        setQty("");
        setCheckedValues([]);
        setId("");
        inputRef.current.value = "";
    }


    return (
        <>
            <div id="Admin-Section">
                <div id='FormArea'>
                    <h2>Product Information</h2>
                    <div className='ImageCheckbox'>
                        <div id='ProductImageContainer'>
                            <img src={imagePath} alt={productName} id='ProductPreview' />
                        </div>
                        <div>
                            <h2>Tags</h2>
                            <div className='CheckBox'>
                                <input
                                    type="checkbox"
                                    name="carousel"
                                    value="carousel"
                                    onChange={checkboxChange}
                                />
                                <label for="carousel">Carousel</label><br />
                                <input
                                    type="checkbox"
                                    name="featured"
                                    value="featured"
                                    onChange={checkboxChange}
                                />
                                <label for="featured">Featured</label><br />
                                <input
                                    type="checkbox"
                                    name="sale"
                                    value="sale"
                                    onChange={checkboxChange}
                                />
                                <label for="sale">Sale</label><br />
                                <input
                                    type="checkbox"
                                    name="hot"
                                    value="hot"
                                    onChange={checkboxChange}
                                />
                                <label for="hot">Hot</label><br />
                            </div>
                        </div>
                    </div>
                    <input type="file"
                        id="Image-Input"
                        ref={inputRef}
                        onChange={(e) => handleImageChange(e.target.files[0])} />
                    <input type="text"
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Name Your Product"
                        value={productName}
                        id="Name-Input" />
                    <div className='PriceQty'>
                        <input type="text"
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Product Price"
                            value={price}
                            id="Price-Input" />

                        <input type="text"
                            onChange={(e) => setQty(e.target.value)}
                            value={qty}
                            placeholder="Qty"
                            id="Qty-Input" />
                    </div>
                    <div className="Buttons-Input">
                        <button id="Cancel-Button" onClick={clearInputs}>Cancel</button>
                        <button id="Create-Button" onClick={createOrEditProduct}>Save</button>
                    </div>
                    {/* </div> */}
                </div>
                <div id='ProductSectionAdmin'>
                    {products.map((product) => {
                        return (
                            <div id='Product-Card'>
                                <div>
                                    <img src={product.imagePath} alt={product.productName} />
                                </div>
                                <div>
                                    <p>{product.productName}</p>
                                    <p>Price: &#8369;{product.price}</p>
                                    <p>Stock: {product.qty}</p>
                                    <p>Tags: {product.tags}</p>
                                </div>
                                <button id='Delete-Button' onClick={() => deleteProduct(product._id)}>Delete</button>
                                <button id='Edit-Button' onClick={() => fillInputs(product._id)}>Edit</button>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default Admin;