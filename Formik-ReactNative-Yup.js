import React from "react";
import { Text, TextInput, Button } from "react-native";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";

type Props = {
	navigation: any;
};
const MyData = (props: Props) => (
	<Formik
		initialValues={{ email: "", pass: "" }}
		onSubmit={(values) => console.log("onSubmit done", values)} // сработает когда будет нажата (1)
		validationSchema={yup.object().shape({
			email: yup.string().email("wrong email!"),
			pass: yup.string().min(6),
		})} // так-же можно делать свою валидацию, без yup
		/*validate={(values) => { вот пример этого
    let errors = {};
    if(!values.email)
      errors.email = "Email Address Required";
    //check if my values have errors
    return errors;
  }}*/
	>
		{({
				values,
				handleChange, //обработчик
				errors, //объект с ошибками формируемый выше
				setFieldTouched, // это сработает не так как onBlur, а наоборот когда я кликаю на поле
				touched, // будет  true когда я начну вводить что-то в поле
				isValid, //показывает являются ли всё что я обрабатываю валидным (2)
				handleSubmit, //обработчик отправки (1)
			}) => (
			<>
				{touched.email &&
				errors.email && ( //показ ошибки валидации
					<Text style={{ fontSize: 10, color: "red" }}>{errors.email}</Text>
				)}
				<TextInput
					value={values.email}
					onChangeText={handleChange("email")}
					onBlur={() => setFieldTouched("email")} //onBlur срабатывает, когда я кликнул на поле, а потом ушел с него
					placeholder={"email"}
				/>
				<Button
					title="Sign In"
					disabled={!isValid} //(2)<--
					onPress={handleSubmit as any} // (1)<--
				/>
			</>
		)}
	</Formik>
);

export default MyData;
