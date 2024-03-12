import  React,{ useEffect, useState ,p} from 'react'
import MyContext from './myContext';
import { fireDB } from '../../firebase/firebaseConfig';
import { Timestamp, addDoc, getDocs, collection,doc,setDoc, deleteDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Modal from '../../components/modal/Modal';



function MyState(props) {
  const [mode, setMode]= useState('light');
  const [loading, setLoading] = useState(false);

  const toggleMode= ()=>{
    if (mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor='rgb(17,24,39)';  
    }
    else{
      setMode('light');
      document.body.style.backgroundColor='white';
    }
  }

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });

 const addProduct =async ()=>{
    console.log(products);
  if (products.title === null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
    return toast.error('Please fill all fields');
  }
  console.log("hi");
  setLoading(true)
  try {
    const productRef = collection(fireDB, "products")
    await addDoc(productRef, products)
    toast.success("Product Add successfully")

    setTimeout(() => {
      window.location.href="/dashboard"
    }, 1000);

  
    getProductData()
    closeModal()
    setLoading(false)
  } catch (error) {
    console.log("error is"+error)
    setLoading(false)
  }
  setProducts("")
}
    
  
  const [product,setProduct]=useState([]);



  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        // console.log(productsArray);
        // console.log("data is " + data);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


 
  useEffect(()=>{
    getProductData();
    // console.log("getProductData()");
},[]);

const editHandle =(item)=>{
  setProducts(item);
  console.log(item);
}



const updateProduct =async ()=>{
  setLoading(true)
  console.log("products")
  try{
    await setDoc(doc(fireDB, "products", products.id),products)
    toast.success("Product Update successfully")
    getProductData();
    window.location.href="/dashboard"
    setLoading(false)
  }catch(error){

    console.log("error")
    console.log(error)
    setLoading(false)
  }  

}





const deleteProduct =async (item)=>{
  setLoading(true)
  setLoading(true)
  try{
    await deleteDoc(doc(fireDB, "products", item.id));
    toast.success("Product Delete successfully")
    getProductData()
    setLoading(false)
  }catch(error){
    console.log(error)
    setLoading(false)
  }

}

const [order, setOrder] =useState([]);

const getOrderData = async () => {
  // console.log("getOrderData");
  setLoading(true)
  try{
    const result=await getDocs(collection(fireDB, "order"));
    // console.log(result)
    const orderArray =[];
    result.forEach((doc)=>{
      orderArray.push(doc.data())
      setLoading(false)
    });
    setOrder(orderArray);
    setLoading(false);
  }
  catch(error){
    console.log(error)
    setLoading(false)
  }

}

const [user, setUser] = useState([]);

const getUserData = async () => {
  setLoading(true)
  try {
    const result = await getDocs(collection(fireDB, "users"))
    const usersArray = [];
    result.forEach((doc) => {
      usersArray.push(doc.data());
      setLoading(false)
    });
    setUser(usersArray);
    // console.log("user is")
    // console.log(usersArray)
    // console.log("user was")
    setLoading(false);
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}




// useEffect(()=>{
//   getOrderData();
// },[]);

useEffect(() => {
  getProductData();
  getOrderData();
  getUserData();
}, []);


const [searchkey, setSearchkey] = useState('')
const [filterType, setFilterType] = useState('')
const [filterPrice, setFilterPrice] = useState('')


return (
  <MyContext.Provider value={ {
    toggleMode, mode, loading,setLoading ,
    products,setProducts,addProduct,product,
    deleteProduct,updateProduct,editHandle,order,user,
    searchkey,setSearchkey,filterType,filterPrice,
    setFilterPrice,setFilterType}}>
     {props.children}
  </MyContext.Provider>
)
}


  


export default MyState