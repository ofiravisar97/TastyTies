import 'package:flutter/cupertino.dart';
import 'package:frontend/features/auth/presentation/pages/login_page.dart';
import 'package:frontend/features/auth/presentation/pages/register_page.dart';
import 'package:go_router/go_router.dart';
import '../../features/splash/presentation/pages/splash_page.dart';

final GoRouter appRouter = GoRouter(
  initialLocation: '/splash',
  routes: [
    GoRoute(
    path: '/splash',
    name: 'splash',
    builder: (context,state) => const SplashPage(),
    ),
      GoRoute(
      path: "/login",
      name: 'login',
      pageBuilder: (context,state) => CustomTransitionPage(
          child: const LoginPage(),
          key: state.pageKey,
          transitionsBuilder: (context,animation,secondaryAnimation,child) {
            final enter = Tween<Offset>(
              begin: const Offset(1, 0),
              end: Offset.zero,
            ).chain(CurveTween(curve: Curves.easeInOut)).animate(animation);

            final exit = Tween<Offset>(
              begin: Offset.zero,
              end: const Offset(-1, 0), // slide out to left on pop
            ).chain(CurveTween(curve: Curves.easeInOut)).animate(secondaryAnimation);



            return SlideTransition(
              position: enter,
              child: SlideTransition(
                position: exit,
                child: child,
              )
            );
          }
      )
      ),
    GoRoute(
      path: '/register',
      name: "register",
      pageBuilder: (context,state) => CustomTransitionPage(
        child: const RegisterPage(),
        key: state.pageKey,
          transitionsBuilder: (context,animation,secondaryAnimation,child) {
            final enter = Tween<Offset>(
              begin: const Offset(1, 0),
              end: Offset.zero,
            ).chain(CurveTween(curve: Curves.easeInOut)).animate(animation);

            final exit = Tween<Offset>(
              begin: Offset.zero,
              end: const Offset(-1, 0), // slide out to left on pop
            ).chain(CurveTween(curve: Curves.easeInOut)).animate(secondaryAnimation);



            return SlideTransition(
                position: enter,
                child: SlideTransition(
                  position: exit,
                  child: child,
                )
            );
          }
      )
    )
  ]
);