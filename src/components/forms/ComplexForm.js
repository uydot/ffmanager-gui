import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputCustom from "../formcustom/InputCustom";
import { getInstitucions } from "../../service/InstitutionService";
import AutocompleteItemCustom from "../formcustom/AutocompleteItemCustom";

const ComplexForm = ({ initialFormValue, onSubmit, loading }) => {
  const [institutions, setInstitutions] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const res = await getInstitucions();
    setInstitutions(res);
  };

  const formSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("Por Favor ingrese un Nombre")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
    direccion: Yup.string()
      .required("Por Favor ingrese una direccion")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
    telefonoContacto: Yup.string()
      .required("Por Favor ingrese un telefono")
      .max(50, "Nombre debe tener maiximo 50 caracteres "),
    datosInstitucionDeportiva: Yup.object().shape({
      idDatosInstitucionDeportiva: Yup.string().required(
        "Seleccione una institucion"
      ),
    }),
  });

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={formSchema}
      initialValues={initialFormValue}
    >
      <Form>
        <div className="p-fluid formgrid grid">
          <div className="field col-12 md:col-6">
            <label htmlFor="nombre">Nombre</label>
            <InputCustom name="nombre" placeholder="Nombre del complejo" />
          </div>
          <div className="field col-12 md:col-6">
            <label htmlFor="telefonoContacto">Telefono</label>
            <InputCustom name="telefonoContacto" placeholder="312 00 0000 0" />
          </div>
          <div className="field col-12 md:col-12">
            <label htmlFor="direction">Instutucion</label>
            <AutocompleteItemCustom
              name="datosInstitucionDeportiva.idDatosInstitucionDeportiva"
              items={institutions}
              field="nombre"
              labelText={initialFormValue.datosInstitucionDeportiva.nombre}
            />
          </div>
          <div className="field col-12 md:col-12">
            <label htmlFor="direccion">Direccion</label>
            <InputCustom name="direccion" placeholder="Calle 12 # 4 -6" />
          </div>
        </div>
        <Button
          label="Guardar"
          type="submit"
          className="mr-2 mb-2"
          loading={loading}
        />
        <Link to="/complexes">
          <Button label="Volver" className=" p-button-danger mr-2 mb-2" />
        </Link>
      </Form>
    </Formik>
  );
};

export default ComplexForm;
