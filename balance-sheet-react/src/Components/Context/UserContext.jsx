import React , {useEffect , useState , useRef, createContext} from 'react'
import 
{ createUserWithEmailAndPassword , onAuthStateChanged ,
    signInWithEmailAndPassword ,    signOut , sendPasswordResetEmail } from 'firebase/auth';
import { auth , db } from '../Firebase/firebase';
import { doc , setDoc , getDoc } from "firebase/firestore"; 
import { useAlert } from "react-alert";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import validator from 'validator';


export const ContextUser = createContext();

export const UserContext = (props) => {

  const [userStatus, setUserStatus] = useState({});
  const [userRole , setUserRole] = useState({});
  const [loginStatus , setLoginStatus] = useState(false);
  const [status ,setStatus] = useState("");
  const [alert, setAlert] = useState("");
  

    const Name = useRef(null);
    const Email = useRef(null);
    const Password = useRef(null);
    const Role = useRef(null);

    const loginEmail = useRef(null);
    const loginPassword = useRef(null);



    const AlertBox = useAlert();

    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser);
    //   });

    //   const EmailID = Email.current.value;
    //   const PasswordReg = Password.current.value;
    //   const NameReg = Name.current.value;
    //   const RoleReg = Role.current.value;


    const register = async () => {

        const EmailID = Email.current.value;
        const PasswordReg = Password.current.value;
        const NameReg = Name.current.value;
        const RoleReg = Role.current.value;

        try{

            const res =  await createUserWithEmailAndPassword( auth ,EmailID , PasswordReg )
            console.log(res);
            const user = res.user;
            console.log(user.uid);

            await setDoc(doc(db, "users" , user.uid), {
              // UserUid: user.uid,
              FullName: NameReg,
              // Email: EmailID,
              // Password: PasswordReg,
              Role:RoleReg,
              createdAt: new Date(),
            });
   
             setStatus("Register Successfull !!!");
            setAlert("success");

            // console.log("Document written with ID: ", userRef.id);

        }
        catch(err){
            console.log("Email Already Exist!!!");
            setStatus("Email Already Exist !!!");
            setAlert("error")
            
        }
      

    }
    
    const login = async () => {
        const LoginEmailID = loginEmail.current.value;
        const LoginPassword = loginPassword.current.value;
        console.log("LoginEmailID",LoginEmailID);
        console.log("LoginPassword",LoginPassword);
        try {
            const res = await signInWithEmailAndPassword(
              auth,
              LoginEmailID,
              LoginPassword
            );
            const user = res.user
            console.log(user);
            const docRef = doc(db,"users" , user.uid);
            const docSnap = await getDoc(docRef);
            setLoginStatus(true);
            setStatus("Login Successfull !!!");
            setAlert("success");
            if(docSnap.exists()){
              console.log("Document Data" , docSnap.data())
              console.log("Document Data" , docSnap.data().FullName)
              setUserRole(docSnap.data().Role);
              setUserStatus(docSnap.data().FullName);
              
            }
            
            else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }


          } catch (error) {
            console.log("Invalid Credentials");
            setLoginStatus(false);
            setStatus("Invalid Credentials !!!");
            setAlert("error")
          }
    }

    const TriggerYesBtn = async () => {
      const LoginEmailID = loginEmail.current.value;
      try{
        await sendPasswordResetEmail(auth, LoginEmailID);
        AlertBox.show("The Reset Password Link is Sent to Your Email !!!");
      }
      catch(err){
        console.log("User Is Not Registered");
        // AlertBox.error("This User Is Not Registered !!!!");
        AlertBox.error("This User Is Not Registered !!!!");
      }

    }

    const ResetEmail = () => {
      const LoginEmailID = loginEmail.current.value;

      if(LoginEmailID !== "" && validator.isEmail(LoginEmailID)){

        // window.alert("Please Enter Valid Email Address");
        confirmAlert({
          title: "Are You Sure ?",
          message: "Are You Sure You Want To Reset Your Password ?",
          buttons: [
            { 
              label: "Yes",
              onClick: () => TriggerYesBtn()
            },
            {
              label: "No"
            }
          ]
        });
      }
      else{
        // await sendPasswordResetEmail(auth, LoginEmailID);
        AlertBox.show("Please Enter Valid Email Address !!!");
      }
  
    }

    
    const logout = async () => {

        console.log("logouttt");
        await signOut(auth);
      };



    return(

        <ContextUser.Provider
        
        value={{
            Name,
            Email,
            Password,
            Role,
            loginEmail,
            loginPassword,
            status,
            alert,
            loginStatus,
            userStatus,
            userRole,
            register,
            login,
            logout,
            ResetEmail,
        }}
        
        >

             {props.children}

        </ContextUser.Provider>
        
    )
}