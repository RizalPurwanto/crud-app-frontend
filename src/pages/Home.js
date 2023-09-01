import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [peserta, setPeserta] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [satuPeserta, setSatuPeserta] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [birthData, setBirthDate] = useState(new Date());
  const [formWarning, setFormWarning] = useState([]);

  async function fetchPeserta() {
    setIsLoading(true);
    console.log("..fetching Peserta...");

    axios
      .get(`http://localhost/crudApp/api/read.php`)
      .then(async (resp) => {
        console.log(resp.data)
        const parsedRes = resp.data
        console.log(parsedRes, "INI PESERTA");
        setPeserta(parsedRes.body);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("....fetching finished");
      });
  }
  function closeModal() {
    setModalOpen(false);
    setFormData({});
    setFormWarning([])
    setBirthDate(new Date())
  }

  function openModal(id) {
    setModalOpen(true);
  }

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  const handleDelete = (event, id) => {
    event.preventDefault();

    const json = JSON.stringify({id: `${id}`});
    console.log(json, "INI JSON ID");
    axios
      .post(`http://localhost/crudApp/api/delete.php`, json)
      .then(async (resp) => {
        console.log(resp, "INI Resp DELETE");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("....deleting data finished");
        closeModal();
        fetchPeserta()
      });

  }

  const openUpdateModal =(event, id) => {
    event.preventDefault()
    setModalOpen(true);
    let individualData = peserta.find(el => el.id === id)
    setFormData({ ...individualData, id:id, })
  }

  const handleUpdate = (event, id) => {
    event.preventDefault();

   
    let warnArr = []
    if (!formData.nama) {
      warnArr.push("Silahkan isi nama");
    }
    if (!formData.email || formData.email.length < 1) {
      
      warnArr.push("Silahkan isi email");

    }
    if (!formData.alamat || formData.alamat.length < 1) {
      warnArr.push("Silahkan isi alamat");
    }

    if (!formData.no_hp || formData.no_hp.length < 1) {
      warnArr.push("Silahkan isi nomor handphone");
    }

    if (!formData.nik) {
      warnArr.push("Silahkan isi NIK");
    }

    if (!formData.kpj) {
      warnArr.push("Silahkan isi KPJ");
    }
    
    console.log(warnArr, "warnarr")
   if(warnArr.length < 1) {
    const json = JSON.stringify(formData);
    console.log(json, "INI JSON FORMDATA");
    axios
      .post(`http://localhost/crudApp/api/update.php`, json)
      .then(async (resp) => {
        console.log(resp, "INI Resp POST");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("....creating new data finished");
        closeModal();
        fetchPeserta()
      });
   } else {setFormWarning(warnArr)}

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData, "formData")
    let warnArr = []
    if (!formData.nama) {
      warnArr.push("Silahkan isi nama");
    }
    if (!formData.email || formData.email.length < 1) {
      
      warnArr.push("Silahkan isi email");

    }
    if (!formData.alamat || formData.alamat.length < 1) {
      warnArr.push("Silahkan isi alamat");
    }

    if (!formData.no_hp || formData.no_hp.length < 1) {
      warnArr.push("Silahkan isi nomor handphone");
    }

    if (!formData.nik) {
      warnArr.push("Silahkan isi NIK");
    }

    if (!formData.kpj) {
      warnArr.push("Silahkan isi KPJ");
    }
    
    console.log(warnArr, "warnarr")
   if(warnArr.length < 1) {
   if(!formData.id) {
    const json = JSON.stringify(formData);
    console.log(json, "INI JSON FORMDATA");
    axios
      .post(`http://localhost/crudApp/api/create.php`, json)
      .then(async (resp) => {
        console.log(resp, "INI Resp POST");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("....creating new data finished");
        closeModal();
        fetchPeserta()
      });
   }else if (formData.id) {
    const json = JSON.stringify(formData);
    console.log(json, "INI JSON FORMDATA");
    axios
      .post(`http://localhost/crudApp/api/update.php`, json)
      .then(async (resp) => {
        console.log(resp, "INI Resp PUT");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("....creating new data finished");
        closeModal();
        fetchPeserta()
      });
   }
   } else {setFormWarning(warnArr)}
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    fetchPeserta();
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "6px",
        backgroundColor:'darkslategrey'
      }}
    >
      <Modal
        isOpen={isModalOpen}
        style={{
          content: {
            top: "0%",
            left: "50%",
            right: "50%",
            bottom: "-10%",
            marginRight: "-50%",
            marginTop: "20%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "mintCream",
            borderRadius: "10px",
            gap: "20px",
            
          },
        }}
        onRequestClose={closeModal}
      >
        {/* <div>{JSON.stringify(formData)}</div> */}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "grey",
            
            
            width: "90%",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            fontWeight: "600",
            fontSize: "16px",
            gap: "10px",
          }}
        >
          <label htmlFor="nama">Nama</label>
          <input
            type="text"
            name="nama"
            onChange={handleChange}
            id="nama"
            value={formData.nama}
          ></input>
          <label htmlFor="email">Email</label>
          <input value={formData.email} type="email" name="email" onChange={handleChange}></input>
          <label htmlFor="no_hp">Nomor Handphone</label>
          <PhoneInput
            defaultCountry="ID"
            countries={["ID"]}
            name="no_hp"
            value={formData.no_hp}
            onChange={(value) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                no_hp: value,
              }));
            }}
          ></PhoneInput>
          {/* <input type="number" name="no_hp" onChange={handleChange}></input> */}
          <label htmlFor="nik">NIK</label>
          <input
            type="number"
            value={formData.nik}
            onKeyDown={preventMinus}
            onWheel={(e) => e.target.blur()}
            name="nik"
            onChange={handleChange}
          ></input>
          <label htmlFor="kpj">KPJ</label>
          <input
            type="number"
            value={formData.kpj}
            onKeyDown={preventMinus}
            onWheel={(e) => e.target.blur()}
            name="kpj"
            onChange={handleChange}
          ></input>
          <label htmlFor="tempat_lahir">Tempat Lahir</label>
          <input
          value={formData.tempat_lahir}
            type="text"
            name="tempat_lahir"
            onChange={handleChange}
          ></input>
          <label htmlFor="tanggal_lahir">Tanggal Lahir</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            selected={formData.id? new Date(Date.parse(formData.tanggal_lahir.replace(/-/g, '/')))  :birthData}
   
            name="tanggal_lahir"
            onChange={(value) => {
              console.log(value, "datepicker");
              setBirthDate(value);
              if (value) {
                value.setUTCHours(0, 0, 0, 0);
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  tanggal_lahir: value
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " "),
                }));
              }
            }}
          ></DatePicker>
          {/* <input type="datetime-local" name="tanggal_lahir" onChange={handleChange} id=""></input> */}
          <label htmlFor="alamat">Alamat</label>
          <input value={formData.alamat} type="text" name="alamat" onChange={handleChange}></input>
          {isLoading && <div>...loading...</div>}{" "}
          {formWarning.length > 1 && <div style={{
            color:'red'
          }}>{formWarning.join(", ")}</div>}
          <div>
            <button
              style={{
                backgroundColor: "midnightblue",
                color: "mintcream",
                fontSize: "15px",
                fontWeight: "600",
                borderRadius: "9px",
                height: "30px",
                width: "60px",
              }}
              type="submit"
            >
              Kirim
            </button>
            <button
              style={{
                backgroundColor: "firebrick",
                color: "mintcream",
                fontSize: "15px",
                fontWeight: "600",
                borderRadius: "9px",
                height: "30px",
                width: "60px",
              }}
              onClick={closeModal}
            >
              Tutup
            </button>
          </div>
        </form>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "flex-start",
          }}
        ></div>
      </Modal>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: "10px",
          
        }}
      >
        <button style={{
           backgroundColor:'forestgreen',
           color:'mintcream',
           fontWeight:'600',
           borderRadius:'5px',
           fontSize:'15px',
           padding:'3px'
        }} onClick={openModal}>+ Tambahkan Peserta</button>
      </div>

      <table>
        <thead style={{
          backgroundColor:'forestgreen',
          color:'mintcream',
          fontWeight:'600',
          
        }}><tr>
          <td>Id</td>
          <td>Nama Lengkap</td>
          <td>Email</td>
          <td>Nomor HP</td>
          <td>NIK</td>
          <td>KPJ</td>
          <td>Tempat dan Tanggal Lahir</td>
          <td>Alamat</td>
          <td>Tindakan</td>
        </tr></thead>
        
        <tbody style={{
          backgroundColor:'mintcream',
          borderRadius:'3px'
        }}>
        {peserta.length > 0 &&
          peserta.map((el, i) => (
            <tr key={el.id}>
              <td>{i+1}</td>
              <td>{el.nama}</td>
              <td>{el.email}</td>
              <td>{el.no_hp}</td>
              <td>{el.nik}</td>
              <td>{el.kpj}</td>
              <td>
                {el.tempat_lahir},{" "}
                {el.tanggal_lahir.split(" ")[0].split("-").join("/")}
              </td>
              <td>{el.alamat}</td>
              <td>
                <button style={{
                  color:'mintcream',
                  fontWeight:'600',
                  backgroundColor:'darkblue',
                  borderRadius:'4px'
                }} onClick={(e) => openUpdateModal(e, el.id)}>Edit</button>
                <button style={{
                     color:'mintcream',
                     fontWeight:'600',
                     backgroundColor:'red',
                     borderRadius:'4px'
                }} onClick={(e) => handleDelete(e, el.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
     
      </table>
    </div>
  );
}
