package radarin_en3b

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class loadTest1 extends Simulation {

	val httpProtocol = http
		.baseUrl("https://radarinen3bwebapp.herokuapp.com")
		.inferHtmlResources()
		.acceptHeader("image/webp,*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Cache-Control" -> "max-age=0",
		"If-Modified-Since" -> "Wed, 28 Apr 2021 13:19:45 GMT",
		"If-None-Match" -> """W/"d85-17918a2ad68"""",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_1 = Map("Accept" -> "text/css,*/*;q=0.1")

	val headers_2 = Map(
		"Accept" -> "text/css,*/*;q=0.1",
		"Cache-Control" -> "max-age=0",
		"If-Modified-Since" -> "Sat, 26 Oct 1985 08:15:00 GMT",
		"If-None-Match" -> """W/"37bc-eNGUkCb3bhCXe6sFt0PSpUCo4lU"""",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_3 = Map(
		"Accept" -> "text/css,*/*;q=0.1",
		"Cache-Control" -> "max-age=0")

	val headers_4 = Map(
		"Accept" -> "text/css,*/*;q=0.1",
		"Cache-Control" -> "max-age=0",
		"If-Modified-Since" -> "Wed, 28 Apr 2021 13:19:45 GMT",
		"If-None-Match" -> """W/"25c68-17918a2ad68"""")

	val headers_5 = Map(
		"Accept" -> "*/*",
		"Cache-Control" -> "max-age=0",
		"If-Modified-Since" -> "Wed, 28 Apr 2021 13:19:45 GMT",
		"If-None-Match" -> """W/"28d32e-17918a2ad68"""")

	val headers_6 = Map(
		"Accept" -> "*/*",
		"Cache-Control" -> "max-age=0",
		"If-Modified-Since" -> "Wed, 28 Apr 2021 13:19:45 GMT",
		"If-None-Match" -> """W/"a06e-17918a2ad68"""")

	val headers_7 = Map(
		"Accept" -> "text/css,*/*;q=0.1",
		"Cache-Control" -> "max-age=0",
		"If-Modified-Since" -> "Wed, 28 Apr 2021 13:19:45 GMT",
		"If-None-Match" -> """W/"ce4-17918a2ad68"""")

	val headers_8 = Map("Cache-Control" -> "max-age=0")

	val headers_10 = Map(
		"Accept" -> "application/font-woff2;q=1.0,application/font-woff;q=0.9,*/*;q=0.8",
		"Accept-Encoding" -> "identity",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_12 = Map(
		"Accept" -> "*/*",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_13 = Map(
		"Accept" -> "*/*",
		"Access-Control-Request-Headers" -> "content-type",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_14 = Map(
		"Accept" -> "*/*",
		"Content-Type" -> "application/json",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_15 = Map(
		"Accept" -> "*/*",
		"If-None-Match" -> """W/"47d-R3QpEJe/NCR4I6+oHtdOliA3ISU"""",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_16 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_17 = Map(
		"Accept" -> "text/css,*/*;q=0.1",
		"If-Modified-Since" -> "Sat, 26 Oct 1985 08:15:00 GMT",
		"If-None-Match" -> """W/"1da71-7438674ba0"""")

	val headers_18 = Map(
		"Accept" -> "text/css,*/*;q=0.1",
		"If-Modified-Since" -> "Sat, 26 Oct 1985 08:15:00 GMT",
		"If-None-Match" -> """W/"388-7438674ba0"""")

	val headers_19 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Origin" -> "https://inrupt.net",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_21 = Map("If-Modified-Since" -> "Tue, 08 Oct 2019 05:15:00 GMT")

	val headers_22 = Map(
		"If-Modified-Since" -> "Wed, 28 Apr 2021 13:19:45 GMT",
		"If-None-Match" -> """W/"8482-17918a2ad68"""")

	val headers_24 = Map(
		"Accept" -> "*/*",
		"Access-Control-Request-Headers" -> "authorization,dpop",
		"Access-Control-Request-Method" -> "POST",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_25 = Map(
		"Accept" -> "*/*",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL2lucnVwdC5uZXQvdG9rZW4iLCJodG0iOiJQT1NUIiwianRpIjoiYjVkYjE5ZjctODY4YS00ZTU5LWJlNGEtYTdlNTYxZjlkZjQ1IiwiaWF0IjoxNjE5NjE4ODE2fQ.HEvQuhIeBemqfCfVp7bE70B5MgqURyeb3vxD2Sopa-IoXdUWPh09rWiLlh4KoQkkKfdtEESkKiq8kR0vyBk0Yg",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_26 = Map(
		"Accept" -> "*/*",
		"Access-Control-Request-Headers" -> "authorization,dpop",
		"Access-Control-Request-Method" -> "GET",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_27 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcm9maWxlL2NhcmQiLCJodG0iOiJHRVQiLCJqdGkiOiI2YWRmYzI5ZC02NjI0LTQ2OTctODUxYS1lNWJmMDQ3ZTU1NTgiLCJpYXQiOjE2MTk2MTg4MTZ9.yDM5qWeMXr44fEkN0YidC7Rtt8PlU5w5OJPV6WMOPB1qtJSVnybHca5d7DBVcoX2CIOFY-Vv0IlpvHp6QZC20A",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_28 = Map("Accept" -> "*/*")

	val headers_29 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcm9maWxlL2NhcmQiLCJodG0iOiJHRVQiLCJqdGkiOiIyZTQ3NDQ2NC02OWVjLTRkYzQtYTVjZS1mYmZiMWM3YjMxNTYiLCJpYXQiOjE2MTk2MTg4MTZ9.ydjKPp70xujPMxMQ7Hnja06_v99_SEPgcgQBuz59ufOSZyimXIy1HE3CNbwHyh9KZ41ASLUS4lNIZgu-lFm9wg",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_31 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcml2YXRlL1JhZGFyaW5QcktleS9wcml2YXRlS2V5LnR0bCIsImh0bSI6IkdFVCIsImp0aSI6ImM3ZGIzMjU3LWU3NzItNGNhMC04NzQ2LTcxMzlkYjkyZTUyYyIsImlhdCI6MTYxOTYxODgxOH0.e9L4JgYwOxj6V-jgoS8mGofA9SowzjHep6M49PSnf1k-6E9sCJCjZloCeADEk9mdSqDI9qaSQ66HNb-72HVpIQ",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_32 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcml2YXRlL1JhZGFyaW5QcktleS9wcml2YXRlS2V5LnR0bCIsImh0bSI6IkdFVCIsImp0aSI6IjhkNTM1YzE2LWRhOTktNDUwNS05NzgwLTE2MTk3YmRjOTYzYyIsImlhdCI6MTYxOTYxODgxOH0.SQ-wT7tNAgVXZ7TOFteGyIf4h6aNpUbd8yGZlZtSJX09CpGVbL4rxFAh98SQeO38Yb-BBGsQeLUVsORNj7r4yQ",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_33 = Map(
		"Accept" -> "*/*",
		"Access-Control-Request-Headers" -> "authorization,content-type",
		"Access-Control-Request-Method" -> "GET",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_34 = Map(
		"Accept" -> "*/*",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0Iiwid2ViaWQiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcm9maWxlL2NhcmQjbWUifQ.PlQ-I0vD-9WN3hxTSLIvEiwVl3WIKYVZXtPeoT_GOWj-vTuzybrGgy0jnhpQiy0Kxg5nsTMqGg5U02h_-GCekI-y3hv4jlUD667sBA92oTmYZYl1hRwnZ2QEO02ESxq3wFNnt3POd0sjYlt8_x40ASqIZLntZjOoi5rrpOUv64A",
		"content-type" -> "application/json")

	val headers_35 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcm9maWxlL2NhcmQiLCJodG0iOiJHRVQiLCJqdGkiOiIwMjA3NDBlNi02ZDc1LTRjNGQtOWFkZi04YWY3ZGYxMzI0MTkiLCJpYXQiOjE2MTk2MTg4MjB9.2NFLDqIDS-LZ8qlhcHJDR68t1rhGo4IsVIQS_tYXRKO6Jpv2cwKs3m4y_1Ps4HRGP08-PgseUuvia_cqGt_PbA",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_37 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wdWJsaWMvUmFkYXJpbkxvY2F0aW9uc18vc2F2ZWRMb2NhdGlvbnMudHRsIiwiaHRtIjoiR0VUIiwianRpIjoiZDhlNGZlNmQtNzNlMi00ZTY4LTk5OGMtNmExZTczZWM5MDZiIiwiaWF0IjoxNjE5NjE4ODIxfQ.mrZCmZqfVXHm5foOiz6LBgQ9Q8DDqI9UrCuMvi6A6a4OsoZ1UJsxPxbS-ERyCmirpgpum-qQSPCXzEY75H-F7g",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_38 = Map(
		"Accept" -> "*/*",
		"Access-Control-Request-Headers" -> "authorization,content-type,dpop,if-none-match,link",
		"Access-Control-Request-Method" -> "PUT",
		"Cache-Control" -> "no-cache",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"Pragma" -> "no-cache")

	val headers_39 = Map(
		"Accept" -> "*/*",
		"Cache-Control" -> "no-cache",
		"Content-Type" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wdWJsaWMvUmFkYXJpbkxvY2F0aW9uc18vc2F2ZWRMb2NhdGlvbnMudHRsIiwiaHRtIjoiUFVUIiwianRpIjoiZmIzZWJlODktNGI2MC00Y2UxLTlkODAtZGFkYzc5NjA1OWU5IiwiaWF0IjoxNjE5NjE4ODIxfQ.O5tssYyGTOxN9oOlP5JKjdo2AsbQCBXv3DmE-PlaKaGVZbx-WEDqVhNgcVbdkgWQPhWzd5-SNxuc80DSqUD7pA",
		"If-None-Match" -> "*",
		"Link" -> """<http://www.w3.org/ns/ldp#Resource>; rel="type"""",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"Pragma" -> "no-cache",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_157 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcm9maWxlL2NhcmQiLCJodG0iOiJHRVQiLCJqdGkiOiJmODVmZTZiMC0yYTc3LTQ2Y2QtYjgxMy0yMmVjMzVhOWRhNjYiLCJpYXQiOjE2MTk2MTg4NTJ9.9XyVKhbbWMJIoW-ebX0EyJogfTTMrdpvRZ-b1v_0Aeibkc4JH1W_KKRTwpMR_vb-SfvDm6aKeIwEg6Oo1wE_VA",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_158 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcml2YXRlL1JhZGFyaW5QcktleS9wcml2YXRlS2V5LnR0bCIsImh0bSI6IkdFVCIsImp0aSI6IjA3ZTFlMjg2LWRhZTgtNDk5ZC1iM2U5LTc2MDVlMGVhODUwNyIsImlhdCI6MTYxOTYxODg1M30.D-5sx19hTWyO3Uohe3bkp0wjK9IREOsgFu8AWe8D4pUTOGNrMP58KLXR8ZG7bHYswcyX_ahV-Z0G9deEpf1-ng",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_159 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcml2YXRlL1JhZGFyaW5QcktleS9wcml2YXRlS2V5LnR0bCIsImh0bSI6IkdFVCIsImp0aSI6ImUxOTlmZDU4LWRjZDQtNDIwNS04YmIwLWFhYWU3MGMyMGJmMyIsImlhdCI6MTYxOTYxODg1M30.Zh6u6EsV2id3I6wvAH0YijeDZ3k8bDxRS86oBp7ytPIfv4kPUJB0o3XcELgsKR9VZATzBdEfvDxqbyId20V8pQ",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_161 = Map(
		"Accept" -> "*/*",
		"If-None-Match" -> """W/"29db-sJqqTDs0aPI3Bbt/+Uh5jpkq+cM"""",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0Iiwid2ViaWQiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcm9maWxlL2NhcmQjbWUifQ.PlQ-I0vD-9WN3hxTSLIvEiwVl3WIKYVZXtPeoT_GOWj-vTuzybrGgy0jnhpQiy0Kxg5nsTMqGg5U02h_-GCekI-y3hv4jlUD667sBA92oTmYZYl1hRwnZ2QEO02ESxq3wFNnt3POd0sjYlt8_x40ASqIZLntZjOoi5rrpOUv64A",
		"content-type" -> "application/json")

	val headers_162 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcm9maWxlL2NhcmQiLCJodG0iOiJHRVQiLCJqdGkiOiJiNGFmYmRlYS01OTM3LTQ3NzMtOWE3OC01NDlhYzhlZTI3MDMiLCJpYXQiOjE2MTk2MTg4NTR9.A87ANrT7wFcULdZK-nTwnqFgjEhKa0LD_Z-zBEhANE31esCmYDmMFdIGUoI4ujFKGj6OHCWtzxEIsRrpF1wsOw",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_163 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wdWJsaWMvUmFkYXJpbkxvY2F0aW9uc18vc2F2ZWRMb2NhdGlvbnMudHRsIiwiaHRtIjoiR0VUIiwianRpIjoiOWU4YzM1ZWUtNmVlNC00ZDZiLThkOTAtMWZhNGJjZGRkYjU0IiwiaWF0IjoxNjE5NjE4ODU0fQ.dj-RvNCr2w2eutYmJg6mRaooXf6ksyErmmd7rnkQ6Duuyx2hOqLKfDiuJKY6o0Pg7yi5To7bU3XyZEy9BTqOhw",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_166 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcm9maWxlL2NhcmQiLCJodG0iOiJHRVQiLCJqdGkiOiI4MDI1MzA4Mi0xMzJmLTRiZDItYWEwZi1lZDY2MzJhMjY5OTgiLCJpYXQiOjE2MTk2MTg4NjZ9.9xbZctL_QFG-z3Vfig36UYwEKEGHEBrbpt_AJp_kdfRRzAkTtHJWJrTh6fXUZHZn7gcZtsKqfYOSQFIelYPIsA",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_172 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcm9maWxlL2NhcmQiLCJodG0iOiJHRVQiLCJqdGkiOiJkYjNkNmM1MS1mNTBhLTRiYmEtOTMzYi0xMTJmNGJmMTNkNDMiLCJpYXQiOjE2MTk2MTg4NzJ9.JJd751sijcXwNadG8pHbC5365otufKdxik5EvHvBGan6_43MVL4UnU5fzhLXmIRokIs0aPxD0P0P0D2A91GChQ",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_174 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wdWJsaWMvUmFkYXJpblBLZXkvcHVibGljS2V5LnR0bCIsImh0bSI6IkdFVCIsImp0aSI6ImUyY2JjMmM4LTg1MGUtNDAwNi1hYjNmLTkzZjFmZjkyODczNSIsImlhdCI6MTYxOTYxODg3Mn0.1NhcnA6YL1xw-EQuHXxkP0danjTKejFOETs2CAyfh8zOZ6r18uVEMleO5pRHUmHWiU0arFI_dR9XIFi4hTJ4xw",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_175 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcml2YXRlL1JhZGFyaW5QcktleS9wcml2YXRlS2V5LnR0bCIsImh0bSI6IkdFVCIsImp0aSI6IjQzZTA2YmY2LWNhOWUtNGM2Ny04NjQ2LTU5NDQ3ZjFkMGQ5OSIsImlhdCI6MTYxOTYxODg3M30.Mur-vSYx0TuNheihTcOtdlYDz3S5zPlXl7T4m0KAGmDICl72VC-A87Jr1tXIKUlsj9vIvpjQcVrIHjeJ0U_rZw",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_177 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wdWJsaWMvUmFkYXJpblBLZXkvIiwiaHRtIjoiR0VUIiwianRpIjoiNzQ4MGI5NDEtZDEyMS00YjlhLWJiZWItNGVjNjk0NmQzODA5IiwiaWF0IjoxNjE5NjE4ODc0fQ.g7pGnbsza-zKgso8vzRbdCvujYkqOMbSj2qwZiAwDFbPBlxsnsmKeYmXX7lUcKUcUIVIzj-wtDkcdjmOufau_Q",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_178 = Map(
		"Accept" -> "*/*",
		"Access-Control-Request-Headers" -> "authorization,content-type,dpop",
		"Access-Control-Request-Method" -> "PATCH",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_180 = Map(
		"Accept" -> "*/*",
		"Content-Type" -> "application/sparql-update",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wdWJsaWMvUmFkYXJpblBLZXkvcHVibGljS2V5LnR0bCIsImh0bSI6IlBBVENIIiwianRpIjoiMjc4YjhjNmYtN2RjZC00NTVmLWJlMDEtZTg5YjRmNzhhY2ZlIiwiaWF0IjoxNjE5NjE4ODc0fQ.eDUoax7jgLAPSPYV_bfORuJWU8OTD1_MrEMgAEYqYk5EGR63Tizu8YsejfnSLhgE7TUJOFPSaR0StKKJGgMU9Q",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_181 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcml2YXRlL1JhZGFyaW5QcktleS8iLCJodG0iOiJHRVQiLCJqdGkiOiJlMzYxMDk1MS0yMzFhLTQ5NDItYjk4ZS0xNGY4YTEzYmMyMzUiLCJpYXQiOjE2MTk2MTg4NzR9.8G-nbsvvI7TerDIn3V_8-NPbazveOYgPO5IdQdXxUxPCjXaZazlvLuJKg8tFI-zrduga84ki4SnB1muIz15znQ",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

	val headers_183 = Map(
		"Accept" -> "*/*",
		"Content-Type" -> "application/sparql-update",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiN0p1WGh4RXN3MHo5Q05pak9QZWNGbDJQc19GSGpQbGhHMXNiMU52d1NvdyIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiaWc0YTBFajlHZVVsUU4tQmgzcm1DemZqejRFdG4zY1B1aDAzX0sxd1ZDQSIsInkiOiJzajE3OS1vUFRGRlJrbVVLYXNqNm5DcDhiZGNEeVZ3d2FEUFNqRFEwWEFBIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcml2YXRlL1JhZGFyaW5QcktleS9wcml2YXRlS2V5LnR0bCIsImh0bSI6IlBBVENIIiwianRpIjoiNzI3Y2Y5YjctYzQ3MC00NDFhLTg3YzktYTBiYzViNGE1NWQ3IiwiaWF0IjoxNjE5NjE4ODc1fQ.xZ87thcixsDeqp9RmLLq4umDpVKspCFEnR13znlk8FFCfr7s4sTrOeRoEpA5xlNmW5Eo-8pG54zUYtTPa238pQ",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyODQxNiwiaWF0IjoxNjE5NjE4ODE2LCJqdGkiOiIxYmU5Nzg1OWUyMTdmNjJhIiwiY25mIjp7ImprdCI6IjdKdVhoeEVzdzB6OUNOaWpPUGVjRmwyUHNfRkhqUGxoRzFzYjFOdndTb3cifSwiY2xpZW50X2lkIjoiMjg4YjQ0NzdmY2M1YmI5YmRhMTY3Zjk4NzQyZTYzNWYiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.ZLtCSQw9qREwGtux7O_7kyewXo1McPN9yAsOhZyHA9E6ThCm_gVSl4tKcMNJjHr5HEQZxInb_E_qRKhBBqoRizSPMCQ-2DR8CsQ7-ku4sWZvfQjY-Gh4N4u8eU1KegbJ_WJN16fG2ZMoBm8OaH7QwJ2WCIbyCG2ScP1cl2ffd_DlEsU-s773UADJ8SNmeyoxYFBypFFy5UUOPOlHE8ssl3F-CeYK-8B2EHvzNVaMzw94YViFSFYl6jByKZB52nM9xmrvjd6FRgPLSz0tatb6uev_uV3kuk4lEWFC2hcFBNWlJdzdYrNTtdx84eDGWsHJnF5ZtQIo6ESJdnV8S6Yg9Q")

    val uri01 = "https://c.tile.openstreetmap.org"
    val uri02 = "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
    val uri03 = "https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    val uri04 = "https://inrupt.net"
    val uri05 = "https://radarinen3brestapi.herokuapp.com/api/locations"
    val uri06 = "https://b.tile.openstreetmap.org"
    val uri07 = "https://a.tile.openstreetmap.org"
    val uri09 = "https://radarin.inrupt.net"
    val uri10 = "https://fonts.gstatic.com/s/roboto/v27"
    val uri11 = "https://fonts.googleapis.com/css"

	val scn = scenario("loadTest1")
		.exec(http("request_0")
			.get("/")
			.headers(headers_0)
			.resources(http("request_1")
			.get("/src/App.css")
			.headers(headers_1)
			.check(status.is(404)),
            http("request_2")
			.get(uri03)
			.headers(headers_2),
            http("request_3")
			.get(uri11 + "?family=Roboto:300,400,500,700&display=swap")
			.headers(headers_3),
            http("request_4")
			.get("/static/css/2.3021dfe7.chunk.css")
			.headers(headers_4),
            http("request_5")
			.get("/static/js/2.509668d4.chunk.js")
			.headers(headers_5),
            http("request_6")
			.get("/static/js/main.2ee1735e.chunk.js")
			.headers(headers_6),
            http("request_7")
			.get("/static/css/main.88ea1b0b.chunk.css")
			.headers(headers_7),
            http("request_8")
			.get("/static/media/carousel_1.acad13ea.png")
			.headers(headers_8),
            http("request_9")
			.get(uri02)
			.headers(headers_8)))
		.pause(2)
		.exec(http("request_10")
			.get(uri10 + "/KFOmCnqEu92Fr1Mu4mxK.woff2")
			.headers(headers_10)
			.resources(http("request_11")
			.get(uri10 + "/KFOlCnqEu92Fr1MmWUlfBBc4.woff2")
			.headers(headers_10)))
		.pause(2)
		.exec(http("request_12")
			.get(uri04 + "/.well-known/openid-configuration")
			.headers(headers_12)
			.resources(http("request_13")
			.options(uri04 + "/register")
			.headers(headers_13),
            http("request_14")
			.post(uri04 + "/register")
			.headers(headers_14)
			.body(RawFileBody("radarin_en3b/loadtest1/0014_request.json")),
            http("request_15")
			.get(uri04 + "/.well-known/openid-configuration")
			.headers(headers_15),
            http("request_16")
			.get(uri04 + "/authorize?client_id=288b4477fcc5bb9bda167f98742e635f&redirect_uri=https%3A%2F%2Fradarinen3bwebapp.herokuapp.com%2F&response_type=code&scope=openid%20webid&state=c7667ded126747c6bcd1d17af4c8154d&code_challenge=ROPQcT2oYEPthgx_icmxcwY_x0RYVwb98werO9WEd5k&code_challenge_method=S256&response_mode=query")
			.headers(headers_16),
            http("request_17")
			.get(uri04 + "/common/css/bootstrap.min.css")
			.headers(headers_17),
            http("request_18")
			.get(uri04 + "/common/css/solid.css")
			.headers(headers_18)))
		.pause(20)
		.exec(http("request_19")
			.post(uri04 + "/login/password")
			.headers(headers_19)
			.formParam("username", "radarin")
			.formParam("password", "2x23TmSiVEfutKB")
			.formParam("response_type", "code")
			.formParam("display", "")
			.formParam("scope", "openid webid")
			.formParam("client_id", "288b4477fcc5bb9bda167f98742e635f")
			.formParam("redirect_uri", "https://radarinen3bwebapp.herokuapp.com/")
			.formParam("state", "c7667ded126747c6bcd1d17af4c8154d")
			.formParam("nonce", "")
			.formParam("request", "")
			.resources(http("request_20")
			.get("/src/App.css")
			.headers(headers_1)
			.check(status.is(404)),
            http("request_21")
			.get(uri02)
			.headers(headers_21),
            http("request_22")
			.get("/static/media/carousel_1.acad13ea.png")
			.headers(headers_22),
            http("request_23")
			.get(uri04 + "/.well-known/openid-configuration")
			.headers(headers_15),
            http("request_24")
			.options(uri04 + "/token")
			.headers(headers_24),
            http("request_25")
			.post(uri04 + "/token")
			.headers(headers_25)
			.formParam("grant_type", "authorization_code")
			.formParam("redirect_uri", "https://radarinen3bwebapp.herokuapp.com/")
			.formParam("code", "60c5d5f73327b21547000b4062038149")
			.formParam("code_verifier", "1a878589e436473cba32eb0928557a271b848602bb5a497b91ed5585134a42720a6ff53d47b54c51bd3c3dee3fad749d")
			.formParam("client_id", "288b4477fcc5bb9bda167f98742e635f")
			.basicAuth("288b4477fcc5bb9bda167f98742e635f","788411ec6929b2fc3b147fb5d7681460"),
            http("request_26")
			.options(uri09 + "/profile/card")
			.headers(headers_26),
            http("request_27")
			.get(uri09 + "/profile/card")
			.headers(headers_27),
            http("request_28")
			.get("/static/js/3.d6dbd3e7.chunk.js")
			.headers(headers_28),
            http("request_29")
			.get(uri09 + "/profile/card")
			.headers(headers_29),
            http("request_30")
			.options(uri09 + "/private/RadarinPrKey/privateKey.ttl")
			.headers(headers_26),
            http("request_31")
			.get(uri09 + "/private/RadarinPrKey/privateKey.ttl")
			.headers(headers_31),
            http("request_32")
			.get(uri09 + "/private/RadarinPrKey/privateKey.ttl")
			.headers(headers_32),
            http("request_33")
			.options(uri05 + "?webId=https%3A%2F%2Fradarin.inrupt.net%2Fprofile%2Fcard%23me")
			.headers(headers_33),
            http("request_34")
			.get(uri05 + "?webId=https%3A%2F%2Fradarin.inrupt.net%2Fprofile%2Fcard%23me")
			.headers(headers_34),
            http("request_35")
			.get(uri09 + "/profile/card")
			.headers(headers_35),
            http("request_36")
			.options(uri09 + "/public/RadarinLocations_/savedLocations.ttl")
			.headers(headers_26),
            http("request_37")
			.get(uri09 + "/public/RadarinLocations_/savedLocations.ttl")
			.headers(headers_37)
			.check(status.is(404)),
            http("request_38")
			.options(uri09 + "/public/RadarinLocations_/savedLocations.ttl")
			.headers(headers_38),
            http("request_39")
			.put(uri09 + "/public/RadarinLocations_/savedLocations.ttl")
			.headers(headers_39)))
		.pause(1)
		.exec(http("request_40")
			.get(uri01 + "/15/15850/11998.png")
			.resources(http("request_41")
			.get(uri07 + "/15/15853/11996.png"),
            http("request_42")
			.get(uri07 + "/15/15849/11994.png"),
            http("request_43")
			.get(uri06 + "/15/15850/11997.png"),
            http("request_44")
			.get(uri06 + "/15/15851/11996.png"),
            http("request_45")
			.get(uri01 + "/15/15852/11996.png"),
            http("request_46")
			.get(uri06 + "/15/15852/11995.png"),
            http("request_47")
			.get(uri07 + "/15/15850/11996.png"),
            http("request_48")
			.get(uri07 + "/15/15852/11997.png"),
            http("request_49")
			.get(uri01 + "/15/15851/11997.png"),
            http("request_50")
			.get(uri01 + "/15/15853/11995.png"),
            http("request_51")
			.get(uri01 + "/15/15851/11994.png"),
            http("request_52")
			.get(uri01 + "/15/15850/11995.png"),
            http("request_53")
			.get(uri07 + "/15/15851/11995.png"),
            http("request_54")
			.get(uri06 + "/15/15849/11998.png"),
            http("request_55")
			.get(uri01 + "/15/15853/11998.png"),
            http("request_56")
			.get(uri07 + "/15/15851/11998.png"),
            http("request_57")
			.get(uri07 + "/15/15852/11994.png"),
            http("request_58")
			.get(uri07 + "/15/15849/11997.png"),
            http("request_59")
			.get(uri06 + "/15/15852/11998.png"),
            http("request_60")
			.get(uri01 + "/15/15849/11996.png"),
            http("request_61")
			.get(uri06 + "/15/15850/11994.png"),
            http("request_62")
			.get(uri06 + "/15/15853/11994.png"),
            http("request_63")
			.get(uri06 + "/15/15849/11995.png"),
            http("request_64")
			.get(uri06 + "/15/15853/11997.png")))
		.pause(4)
		.exec(http("request_65")
			.get(uri06 + "/14/7926/5998.png")
			.resources(http("request_66")
			.get(uri07 + "/14/7925/5998.png"),
            http("request_67")
			.get(uri01 + "/14/7926/5999.png"),
            http("request_68")
			.get(uri01 + "/11/991/748.png"),
            http("request_69")
			.get(uri07 + "/11/991/749.png"),
            http("request_70")
			.get(uri06 + "/11/991/750.png"),
            http("request_71")
			.get(uri06 + "/11/992/749.png"),
            http("request_72")
			.get(uri01 + "/11/992/750.png"),
            http("request_73")
			.get(uri06 + "/11/990/748.png"),
            http("request_74")
			.get(uri07 + "/11/992/748.png"),
            http("request_75")
			.get(uri07 + "/11/990/750.png"),
            http("request_76")
			.get(uri01 + "/11/990/749.png"),
            http("request_77")
			.get(uri01 + "/12/1985/1497.png"),
            http("request_78")
			.get(uri06 + "/12/1985/1496.png"),
            http("request_79")
			.get(uri06 + "/12/1984/1497.png"),
            http("request_80")
			.get(uri07 + "/12/1985/1498.png"),
            http("request_81")
			.get(uri07 + "/12/1984/1496.png"),
            http("request_82")
			.get(uri01 + "/12/1986/1496.png"),
            http("request_83")
			.get(uri07 + "/12/1986/1497.png"),
            http("request_84")
			.get(uri06 + "/12/1986/1498.png"),
            http("request_85")
			.get(uri01 + "/12/1984/1498.png"),
            http("request_86")
			.get(uri06 + "/12/1985/1499.png"),
            http("request_87")
			.get(uri01 + "/12/1983/1499.png"),
            http("request_88")
			.get(uri07 + "/12/1984/1499.png"),
            http("request_89")
			.get(uri01 + "/12/1984/1495.png"),
            http("request_90")
			.get(uri06 + "/12/1986/1495.png"),
            http("request_91")
			.get(uri01 + "/12/1987/1495.png"),
            http("request_92")
			.get(uri01 + "/12/1983/1496.png"),
            http("request_93")
			.get(uri01 + "/12/1987/1498.png"),
            http("request_94")
			.get(uri06 + "/12/1983/1495.png"),
            http("request_95")
			.get(uri07 + "/12/1987/1496.png"),
            http("request_96")
			.get(uri07 + "/12/1985/1495.png"),
            http("request_97")
			.get(uri07 + "/13/3971/2995.png"),
            http("request_98")
			.get(uri01 + "/13/3970/2995.png"),
            http("request_99")
			.get(uri01 + "/13/3971/2994.png"),
            http("request_100")
			.get(uri06 + "/13/3971/2996.png"),
            http("request_101")
			.get(uri06 + "/13/3972/2995.png"),
            http("request_102")
			.get(uri07 + "/13/3972/2994.png"),
            http("request_103")
			.get(uri06 + "/13/3971/2993.png"),
            http("request_104")
			.get(uri07 + "/13/3970/2996.png"),
            http("request_105")
			.get(uri01 + "/13/3972/2993.png"),
            http("request_106")
			.get(uri06 + "/13/3970/2997.png"),
            http("request_107")
			.get(uri01 + "/13/3972/2996.png"),
            http("request_108")
			.get(uri06 + "/13/3973/2997.png"),
            http("request_109")
			.get(uri01 + "/13/3969/2996.png"),
            http("request_110")
			.get(uri01 + "/13/3969/2993.png"),
            http("request_111")
			.get(uri07 + "/13/3970/2993.png"),
            http("request_112")
			.get(uri01 + "/13/3973/2995.png"),
            http("request_113")
			.get(uri06 + "/13/3970/2994.png"),
            http("request_114")
			.get(uri06 + "/13/3969/2995.png"),
            http("request_115")
			.get(uri06 + "/14/7943/5990.png"),
            http("request_116")
			.get(uri01 + "/14/7944/5990.png"),
            http("request_117")
			.get(uri06 + "/14/7944/5989.png"),
            http("request_118")
			.get(uri01 + "/14/7945/5989.png"),
            http("request_119")
			.get(uri01 + "/14/7945/5992.png"),
            http("request_120")
			.get(uri06 + "/14/7945/5991.png"),
            http("request_121")
			.get(uri01 + "/14/7942/5989.png"),
            http("request_122")
			.get(uri01 + "/14/7943/5991.png"),
            http("request_123")
			.get(uri06 + "/14/7944/5992.png"),
            http("request_124")
			.get(uri01 + "/14/7946/5988.png"),
            http("request_125")
			.get(uri06 + "/14/7946/5990.png"),
            http("request_126")
			.get(uri01 + "/14/7943/5988.png"),
            http("request_127")
			.get(uri07 + "/14/7944/5991.png"),
            http("request_128")
			.get(uri06 + "/14/7945/5988.png"),
            http("request_129")
			.get(uri07 + "/14/7945/5990.png"),
            http("request_130")
			.get(uri06 + "/14/7942/5988.png"),
            http("request_131")
			.get(uri07 + "/14/7943/5989.png"),
            http("request_132")
			.get(uri06 + "/15/15888/11980.png"),
            http("request_133")
			.get(uri06 + "/15/15889/11979.png"),
            http("request_134")
			.get(uri01 + "/15/15889/11980.png"),
            http("request_135")
			.get(uri06 + "/15/15890/11981.png"),
            http("request_136")
			.get(uri01 + "/15/15890/11979.png"),
            http("request_137")
			.get(uri06 + "/15/15887/11981.png"),
            http("request_138")
			.get(uri01 + "/15/15886/11980.png"),
            http("request_139")
			.get(uri01 + "/15/15888/11981.png"),
            http("request_140")
			.get(uri07 + "/15/15889/11978.png"),
            http("request_141")
			.get(uri01 + "/15/15888/11978.png"),
            http("request_142")
			.get(uri01 + "/15/15887/11979.png"),
            http("request_143")
			.get(uri06 + "/15/15887/11978.png"),
            http("request_144")
			.get(uri01 + "/15/15890/11982.png"),
            http("request_145")
			.get(uri06 + "/15/15886/11979.png"),
            http("request_146")
			.get(uri07 + "/15/15888/11979.png"),
            http("request_147")
			.get(uri07 + "/15/15887/11980.png"),
            http("request_148")
			.get(uri07 + "/15/15886/11981.png"),
            http("request_149")
			.get(uri01 + "/15/15887/11982.png"),
            http("request_150")
			.get(uri06 + "/15/15886/11982.png"),
            http("request_151")
			.get(uri06 + "/15/15889/11982.png"),
            http("request_152")
			.get(uri07 + "/15/15890/11980.png"),
            http("request_153")
			.get(uri07 + "/15/15886/11978.png"),
            http("request_154")
			.get(uri07 + "/15/15888/11982.png"),
            http("request_155")
			.get(uri06 + "/15/15890/11978.png"),
            http("request_156")
			.get(uri07 + "/15/15889/11981.png")))
		.pause(22)
		.exec(http("request_157")
			.get(uri09 + "/profile/card")
			.headers(headers_157)
			.resources(http("request_158")
			.get(uri09 + "/private/RadarinPrKey/privateKey.ttl")
			.headers(headers_158),
            http("request_159")
			.get(uri09 + "/private/RadarinPrKey/privateKey.ttl")
			.headers(headers_159),
            http("request_160")
			.options(uri05 + "?webId=https%3A%2F%2Fradarin.inrupt.net%2Fprofile%2Fcard%23me")
			.headers(headers_33),
            http("request_161")
			.get(uri05 + "?webId=https%3A%2F%2Fradarin.inrupt.net%2Fprofile%2Fcard%23me")
			.headers(headers_161),
            http("request_162")
			.get(uri09 + "/profile/card")
			.headers(headers_162),
            http("request_163")
			.get(uri09 + "/public/RadarinLocations_/savedLocations.ttl")
			.headers(headers_163)))
		.pause(11)
		.exec(http("request_164")
			.get("/static/media/marcos.36b67cd0.jpg")
			.resources(http("request_165")
			.get("/static/media/pablo.8864122f.jpg"),
            http("request_166")
			.get(uri09 + "/profile/card")
			.headers(headers_166),
            http("request_167")
			.get("/static/media/juan.b6468e7b.jpg"),
            http("request_168")
			.get("/static/media/alvaro.d3125b58.jpg"),
            http("request_169")
			.get("/static/media/labra.13026354.png"),
            http("request_170")
			.get("/static/media/miguel.04e3d73a.jpg"),
            http("request_171")
			.get("/static/media/carmen.347fcdcd.jpg")))
		.pause(4)
		.exec(http("request_172")
			.get(uri09 + "/profile/card")
			.headers(headers_172)
			.resources(http("request_173")
			.options(uri09 + "/public/RadarinPKey/publicKey.ttl")
			.headers(headers_26),
            http("request_174")
			.get(uri09 + "/public/RadarinPKey/publicKey.ttl")
			.headers(headers_174),
            http("request_175")
			.get(uri09 + "/private/RadarinPrKey/privateKey.ttl")
			.headers(headers_175),
            http("request_176")
			.options(uri09 + "/public/RadarinPKey/")
			.headers(headers_26),
            http("request_177")
			.get(uri09 + "/public/RadarinPKey/")
			.headers(headers_177),
            http("request_178")
			.options(uri09 + "/public/RadarinPKey/publicKey.ttl")
			.headers(headers_178),
            http("request_179")
			.options(uri09 + "/private/RadarinPrKey/")
			.headers(headers_26),
            http("request_180")
			.patch(uri09 + "/public/RadarinPKey/publicKey.ttl")
			.headers(headers_180)
			.body(RawFileBody("radarin_en3b/loadtest1/0180_request.dat")),
            http("request_181")
			.get(uri09 + "/private/RadarinPrKey/")
			.headers(headers_181),
            http("request_182")
			.options(uri09 + "/private/RadarinPrKey/privateKey.ttl")
			.headers(headers_178),
            http("request_183")
			.patch(uri09 + "/private/RadarinPrKey/privateKey.ttl")
			.headers(headers_183)
			.body(RawFileBody("radarin_en3b/loadtest1/0183_request.dat"))))

	setUp(scn.inject(constantUsersPerSec(2) during (60 seconds) randomized)).protocols(httpProtocol)
}