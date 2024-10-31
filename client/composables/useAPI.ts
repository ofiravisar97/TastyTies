import type { UseFetchOptions } from "#app";

export function useAPI() {
  const csrf = useCookie("XSRF-TOKEN");

  if (!csrf.value) {
    $fetch("/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
      baseURL: "http://localhost:8000",
    });
  }

  const api = $fetch.create({
    baseURL: "http://localhost:8000/api",
    credentials: "include",
    onRequest(context) {
      if (context.options.method === "GET" || !csrf.value) {
        return;
      }
      context.options.headers.set("X-XSRF-TOKEN", csrf.value.toString());
    },
  });

  const privateApi = $fetch.create({
    baseURL: "http://localhost:8000/api",
    credentials: "include",
    onRequest(context) {
      if (context.options.method === "GET" || !csrf.value) {
        return;
      }

      const token = useCookie("Token");
      context.options.headers.set(
        "Authorization",
        `Bearer ${token.value?.toString()}`
      );
      context.options.headers.set("X-XSRF-TOKEN", csrf.value.toString());
    },
  });

  return { api, privateApi };
}
