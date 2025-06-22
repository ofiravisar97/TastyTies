import 'package:flutter/material.dart';
import 'package:frontend/core/configs/theme/app_colors.dart';
import 'package:frontend/widgets/logo.dart';
import 'package:go_router/go_router.dart';
import 'package:sign_in_button/sign_in_button.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}


class _RegisterPageState extends State<RegisterPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final TextEditingController _displayNameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();

  @override
  void dispose() {
    _confirmPasswordController.dispose();
    _passwordController.dispose();
    _emailController.dispose();
    _displayNameController.dispose();
    super.dispose();
  }

  void _submitForm(){
    if(_formKey.currentState!.validate()){
      // Proceed with your login logic
      final String email = _emailController.text;
      final String password = _passwordController.text;

      print('Form is valid! Email: $email, Password: $password');
      // Example: Call an authentication service
      // AuthService().login(email, password);

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Processing Data...')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final backgroundColor = Theme.of(context).brightness == Brightness.dark ? AppColors.darkBackground : AppColors.lightBackground;


    return Scaffold(
      backgroundColor: backgroundColor,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 32),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(height: 60),

                  // Logo
                  Logo(),


                  const SizedBox(height: 60),

                  // Display Name TextField
                  TextFormField(
                    maxLength: 40,
                    controller: _displayNameController,
                    decoration: InputDecoration(
                      hintText: 'Display Name',

                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                          borderSide: BorderSide(color: AppColors.darkPrimary,width: 1.5)
                      ),
                      prefixIcon: Icon(Icons.person),
                    ),
                    keyboardType: TextInputType.text,
                    validator: (value) {
                      if(value == null || value.isEmpty){
                        return "Display name field is required.";
                      }
                    },
                    cursorColor: AppColors.primary,
                  ),

                  const SizedBox(height: 16),


                  // Email TextField
                  TextFormField(
                    controller: _emailController,
                    decoration: InputDecoration(
                      hintText: 'Email',

                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                          borderSide: BorderSide(color: AppColors.darkPrimary,width: 1.5)
                      ),
                      prefixIcon: Icon(Icons.email),
                    ),
                    keyboardType: TextInputType.emailAddress,
                    cursorColor: AppColors.primary,
                    validator: (value) {
                      if(value == null || value.isEmpty){
                        return "Email field is required.";
                      }
                      if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value!)) {
                        return 'Invalid email.';
                      }
                    },
                  ),

                  const SizedBox(height: 16),

                  // Password TextField
                  TextFormField(
                    controller: _passwordController,
                    decoration: InputDecoration(
                      hintText: 'Password',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                          borderSide: BorderSide(color: AppColors.darkPrimary,width: 1.5)
                      ),
                      prefixIcon: Icon(Icons.lock),
                    ),
                    obscureText: true,
                    cursorColor: AppColors.primary,
                    maxLength: 40,
                    validator: (value){
                      if(value != null && value.length < 8){
                        return "Password must contain at least 8 characters";
                      }
                    },
                  ),

                  const SizedBox(height: 16),

                  // Confirm TextField
                  TextFormField(
                    controller: _confirmPasswordController,
                    decoration: InputDecoration(
                      hintText: 'Confirm Password',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                          borderSide: BorderSide(color: AppColors.darkPrimary,width: 1.5)
                      ),
                      prefixIcon: Icon(Icons.verified),
                    ),
                    obscureText: true,
                    cursorColor: AppColors.primary,
                    validator: (value) {
                      if(value != _passwordController.text){
                        return "Passwords doesn't match";
                      }
                    }
                  ),


                  const SizedBox(height: 16),

                  // Login Button
                  SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: Container(
                      decoration: BoxDecoration(
                        gradient: AppColors.primaryGradient,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: ElevatedButton(
                        onPressed: _submitForm,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.transparent,
                          shadowColor: Colors.transparent,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                        child: const Text(
                          'Register',
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Sign up prompt
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text("Already a user?"),
                      TextButton(
                        onPressed: () {
                          context.pop();
                        },
                        child: const Text("Sign in",style: TextStyle(color: AppColors.darkPrimary,fontWeight: FontWeight.bold)),
                      )
                    ],
                  ),
                ],
              ),
            )
          ),
        ),
      ),
    );
  }
}