package radarin_en3b

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class loadTest2 extends Simulation {

	val httpProtocol = http
		.baseUrl("https://radarinen3bwebapp.herokuapp.com")
		.inferHtmlResources()
		.acceptHeader("image/webp,*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3")
		.userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0")

	val headers_0 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"If-Modified-Since" -> "Wed, 28 Apr 2021 13:19:45 GMT",
		"If-None-Match" -> """W/"d85-17918a2ad68"""",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_1 = Map("Accept" -> "text/css,*/*;q=0.1")

	val headers_2 = Map(
		"Accept" -> "application/font-woff2;q=1.0,application/font-woff;q=0.9,*/*;q=0.8",
		"Accept-Encoding" -> "identity")

	val headers_5 = Map(
		"Accept" -> "*/*",
		"If-None-Match" -> """W/"47d-R3QpEJe/NCR4I6+oHtdOliA3ISU"""",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_6 = Map(
		"Accept" -> "*/*",
		"Content-Type" -> "application/json",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_8 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_10 = Map(
		"Accept" -> "*/*",
		"If-Modified-Since" -> "Wed, 28 Apr 2021 14:24:18 GMT",
		"If-None-Match" -> """W/"28d32e-17918ddc650"""")

	val headers_11 = Map(
		"Accept" -> "text/css,*/*;q=0.1",
		"If-Modified-Since" -> "Wed, 28 Apr 2021 14:24:18 GMT",
		"If-None-Match" -> """W/"25c68-17918ddc650"""")

	val headers_12 = Map(
		"Accept" -> "*/*",
		"If-Modified-Since" -> "Wed, 28 Apr 2021 14:24:18 GMT",
		"If-None-Match" -> """W/"a06e-17918ddc650"""")

	val headers_13 = Map(
		"Accept" -> "text/css,*/*;q=0.1",
		"If-Modified-Since" -> "Wed, 28 Apr 2021 14:24:18 GMT",
		"If-None-Match" -> """W/"ce4-17918ddc650"""")

	val headers_14 = Map("If-Modified-Since" -> "Tue, 08 Oct 2019 05:15:00 GMT")

	val headers_15 = Map(
		"If-Modified-Since" -> "Wed, 28 Apr 2021 14:24:18 GMT",
		"If-None-Match" -> """W/"8482-17918ddc650"""")

	val headers_17 = Map(
		"Accept" -> "*/*",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiRi1qS3YxbUx6RDFMMG94MVg2X2dCdVd6WENZd1Q1Ql9UVFJnMXB3bHI4NCIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiQ1Zzd1Bkd05wUXl3QThMVFZqU0Y5REFVWU9mSkdteG5TcWNxc0VEUXpROCIsInkiOiJ4RDNWMTdMSlo4cWVzeDZMMVdHdkp3UmN0VjhpMlZRWldOa0FfUmMtVGJvIn19.eyJodHUiOiJodHRwczovL2lucnVwdC5uZXQvdG9rZW4iLCJodG0iOiJQT1NUIiwianRpIjoiYjA4OTViMGMtOWY5My00ZTdmLTkyYTItNGM3NzRjYjM1ZDU4IiwiaWF0IjoxNjE5NjIwMTIxfQ.W6VAlkKaGsKMmUjypOAziSX79XMj2lh0LI8GymrTJrIgW6VaGF_t4sX9gm7qDyewW2vNH5hx74Rc8fxLsPKlbA",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_18 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiRi1qS3YxbUx6RDFMMG94MVg2X2dCdVd6WENZd1Q1Ql9UVFJnMXB3bHI4NCIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiQ1Zzd1Bkd05wUXl3QThMVFZqU0Y5REFVWU9mSkdteG5TcWNxc0VEUXpROCIsInkiOiJ4RDNWMTdMSlo4cWVzeDZMMVdHdkp3UmN0VjhpMlZRWldOa0FfUmMtVGJvIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcm9maWxlL2NhcmQiLCJodG0iOiJHRVQiLCJqdGkiOiI1MDcwMGIwYy1mYzdhLTQzNzEtYjllNy02MzJmNjg2YTI4YmYiLCJpYXQiOjE2MTk2MjAxMjJ9.O3nwPSItsefbPGXdaFOVxz0sFNLnzPl9VP66_gpQTGQscVyxf0xJZbsKOyZKsZ31cGF5KRHTHqn8YgkHLASrCw",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyOTcyMiwiaWF0IjoxNjE5NjIwMTIyLCJqdGkiOiJiNmM1MzM5ZmEzZjQxMzY1IiwiY25mIjp7ImprdCI6IkYtakt2MW1MekQxTDBveDFYNl9nQnVXelhDWXdUNUJfVFRSZzFwd2xyODQifSwiY2xpZW50X2lkIjoiMzE2ZmQ1YTNiNTFkN2Q0M2Y0ZWY5YjAzYzJmMTZiNTkiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.nRI3bKC0LSZec9yztg733NiMjqhJ19fPPuKO2br-T2kQuWn4YpmojmPSpkhEDaYf_spgwKgFZQyfIbBMPxtfa7cG3zIvYfvWtpXO6l7KanYVdZHT6r4BKAMOWDXuCWlS2TO0ugeYFAun_TNIdy4xI9QoFhLU_tF2zLH1ge1LuDnWyFkEx6OabM9JY60BGKs9xwqXyp1p7N4MDoPAxR9_QfLUVuTTUMpavuB919fzojKYxhrnJW-t-r3if243iDestMTmywchcrpO2KeYDg6akcuuBsyDamHP-ADNRqcLtyFhnDmfR-Acnv3uvJgXkMn0W3ntuiHy4JqSmJAAPpdcPQ")

	val headers_19 = Map(
		"Accept" -> "*/*",
		"If-Modified-Since" -> "Wed, 28 Apr 2021 13:19:45 GMT",
		"If-None-Match" -> """W/"c73d-17918a2ad68"""")

	val headers_20 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiRi1qS3YxbUx6RDFMMG94MVg2X2dCdVd6WENZd1Q1Ql9UVFJnMXB3bHI4NCIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiQ1Zzd1Bkd05wUXl3QThMVFZqU0Y5REFVWU9mSkdteG5TcWNxc0VEUXpROCIsInkiOiJ4RDNWMTdMSlo4cWVzeDZMMVdHdkp3UmN0VjhpMlZRWldOa0FfUmMtVGJvIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcm9maWxlL2NhcmQiLCJodG0iOiJHRVQiLCJqdGkiOiI4NTFkMmFkMS1jYmUxLTQwMWItYjZkYy04ZGU3M2NjM2E3YjUiLCJpYXQiOjE2MTk2MjAxMjJ9.YD696ViFi3qTAKJXbKTCZyxwttFpO6Cz0Io3ie4QqBiWqjRZrTPM9eEngSQX9sJzdoa9aF9vqNMpIdqInQRcCA",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyOTcyMiwiaWF0IjoxNjE5NjIwMTIyLCJqdGkiOiJiNmM1MzM5ZmEzZjQxMzY1IiwiY25mIjp7ImprdCI6IkYtakt2MW1MekQxTDBveDFYNl9nQnVXelhDWXdUNUJfVFRSZzFwd2xyODQifSwiY2xpZW50X2lkIjoiMzE2ZmQ1YTNiNTFkN2Q0M2Y0ZWY5YjAzYzJmMTZiNTkiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.nRI3bKC0LSZec9yztg733NiMjqhJ19fPPuKO2br-T2kQuWn4YpmojmPSpkhEDaYf_spgwKgFZQyfIbBMPxtfa7cG3zIvYfvWtpXO6l7KanYVdZHT6r4BKAMOWDXuCWlS2TO0ugeYFAun_TNIdy4xI9QoFhLU_tF2zLH1ge1LuDnWyFkEx6OabM9JY60BGKs9xwqXyp1p7N4MDoPAxR9_QfLUVuTTUMpavuB919fzojKYxhrnJW-t-r3if243iDestMTmywchcrpO2KeYDg6akcuuBsyDamHP-ADNRqcLtyFhnDmfR-Acnv3uvJgXkMn0W3ntuiHy4JqSmJAAPpdcPQ")

	val headers_21 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiRi1qS3YxbUx6RDFMMG94MVg2X2dCdVd6WENZd1Q1Ql9UVFJnMXB3bHI4NCIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiQ1Zzd1Bkd05wUXl3QThMVFZqU0Y5REFVWU9mSkdteG5TcWNxc0VEUXpROCIsInkiOiJ4RDNWMTdMSlo4cWVzeDZMMVdHdkp3UmN0VjhpMlZRWldOa0FfUmMtVGJvIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcml2YXRlL1JhZGFyaW5QcktleS9wcml2YXRlS2V5LnR0bCIsImh0bSI6IkdFVCIsImp0aSI6IjY0ZTRiZTZkLTI5ZDAtNGNhZC1hYmZhLWY3NjhjMjEyYWY3ZSIsImlhdCI6MTYxOTYyMDEyM30.2iNtK9_LqcyLD2Sa6BunEPEowHwhev2twvDi87AT7l7I2516gK8R-0GJu9YpTys3sImrsMPMthj8cUMIvAtsqA",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyOTcyMiwiaWF0IjoxNjE5NjIwMTIyLCJqdGkiOiJiNmM1MzM5ZmEzZjQxMzY1IiwiY25mIjp7ImprdCI6IkYtakt2MW1MekQxTDBveDFYNl9nQnVXelhDWXdUNUJfVFRSZzFwd2xyODQifSwiY2xpZW50X2lkIjoiMzE2ZmQ1YTNiNTFkN2Q0M2Y0ZWY5YjAzYzJmMTZiNTkiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.nRI3bKC0LSZec9yztg733NiMjqhJ19fPPuKO2br-T2kQuWn4YpmojmPSpkhEDaYf_spgwKgFZQyfIbBMPxtfa7cG3zIvYfvWtpXO6l7KanYVdZHT6r4BKAMOWDXuCWlS2TO0ugeYFAun_TNIdy4xI9QoFhLU_tF2zLH1ge1LuDnWyFkEx6OabM9JY60BGKs9xwqXyp1p7N4MDoPAxR9_QfLUVuTTUMpavuB919fzojKYxhrnJW-t-r3if243iDestMTmywchcrpO2KeYDg6akcuuBsyDamHP-ADNRqcLtyFhnDmfR-Acnv3uvJgXkMn0W3ntuiHy4JqSmJAAPpdcPQ")

	val headers_22 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiRi1qS3YxbUx6RDFMMG94MVg2X2dCdVd6WENZd1Q1Ql9UVFJnMXB3bHI4NCIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiQ1Zzd1Bkd05wUXl3QThMVFZqU0Y5REFVWU9mSkdteG5TcWNxc0VEUXpROCIsInkiOiJ4RDNWMTdMSlo4cWVzeDZMMVdHdkp3UmN0VjhpMlZRWldOa0FfUmMtVGJvIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcml2YXRlL1JhZGFyaW5QcktleS9wcml2YXRlS2V5LnR0bCIsImh0bSI6IkdFVCIsImp0aSI6IjFkNTdiMTI5LTY3NTgtNGFmYS05MzY0LTE2NWYwODA0YzQxMSIsImlhdCI6MTYxOTYyMDEyM30.FSmC3ejApAhucuKwBcvmPZd-4PvA_hBVFD8oYCuZzTomil7aCzsjZLlKsiUOqUrM90r1wxE-ZFOQ79uRIrkzng",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyOTcyMiwiaWF0IjoxNjE5NjIwMTIyLCJqdGkiOiJiNmM1MzM5ZmEzZjQxMzY1IiwiY25mIjp7ImprdCI6IkYtakt2MW1MekQxTDBveDFYNl9nQnVXelhDWXdUNUJfVFRSZzFwd2xyODQifSwiY2xpZW50X2lkIjoiMzE2ZmQ1YTNiNTFkN2Q0M2Y0ZWY5YjAzYzJmMTZiNTkiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.nRI3bKC0LSZec9yztg733NiMjqhJ19fPPuKO2br-T2kQuWn4YpmojmPSpkhEDaYf_spgwKgFZQyfIbBMPxtfa7cG3zIvYfvWtpXO6l7KanYVdZHT6r4BKAMOWDXuCWlS2TO0ugeYFAun_TNIdy4xI9QoFhLU_tF2zLH1ge1LuDnWyFkEx6OabM9JY60BGKs9xwqXyp1p7N4MDoPAxR9_QfLUVuTTUMpavuB919fzojKYxhrnJW-t-r3if243iDestMTmywchcrpO2KeYDg6akcuuBsyDamHP-ADNRqcLtyFhnDmfR-Acnv3uvJgXkMn0W3ntuiHy4JqSmJAAPpdcPQ")

	val headers_23 = Map(
		"Accept" -> "*/*",
		"Access-Control-Request-Headers" -> "authorization,content-type",
		"Access-Control-Request-Method" -> "GET",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com")

	val headers_24 = Map(
		"Accept" -> "*/*",
		"If-None-Match" -> """W/"29db-sJqqTDs0aPI3Bbt/+Uh5jpkq+cM"""",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0Iiwid2ViaWQiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcm9maWxlL2NhcmQjbWUifQ.HCUkgh0t4cEuOnfzozLUtu6JnY1_EsG7xV22RL1s9s7SIU77asDAU5kgsnvWOarQCzk3KXyx_6HPauJ_2urVDIhqDsm_mB8l4BP55tP4J28_bLzDkp8olt-BKsFzqwrYePL7dx_M_uP0AYOFXQ6AWltxgnskDquvEoTctFmHoqc",
		"content-type" -> "application/json")

	val headers_25 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiRi1qS3YxbUx6RDFMMG94MVg2X2dCdVd6WENZd1Q1Ql9UVFJnMXB3bHI4NCIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiQ1Zzd1Bkd05wUXl3QThMVFZqU0Y5REFVWU9mSkdteG5TcWNxc0VEUXpROCIsInkiOiJ4RDNWMTdMSlo4cWVzeDZMMVdHdkp3UmN0VjhpMlZRWldOa0FfUmMtVGJvIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wcm9maWxlL2NhcmQiLCJodG0iOiJHRVQiLCJqdGkiOiJkZTc3OGE1Mi0wYzMzLTQ2YjQtYTI2Mi00MWY3Yzc5Y2JjNzciLCJpYXQiOjE2MTk2MjAxMjR9.fAvamR2uOFrVAESFAgJ9W1421LB9WvrbHH1BPbcZuK_Wj6Olkra0moSanwHBiFYgFXmTKRsslZzl37yRBXy_ag",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyOTcyMiwiaWF0IjoxNjE5NjIwMTIyLCJqdGkiOiJiNmM1MzM5ZmEzZjQxMzY1IiwiY25mIjp7ImprdCI6IkYtakt2MW1MekQxTDBveDFYNl9nQnVXelhDWXdUNUJfVFRSZzFwd2xyODQifSwiY2xpZW50X2lkIjoiMzE2ZmQ1YTNiNTFkN2Q0M2Y0ZWY5YjAzYzJmMTZiNTkiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.nRI3bKC0LSZec9yztg733NiMjqhJ19fPPuKO2br-T2kQuWn4YpmojmPSpkhEDaYf_spgwKgFZQyfIbBMPxtfa7cG3zIvYfvWtpXO6l7KanYVdZHT6r4BKAMOWDXuCWlS2TO0ugeYFAun_TNIdy4xI9QoFhLU_tF2zLH1ge1LuDnWyFkEx6OabM9JY60BGKs9xwqXyp1p7N4MDoPAxR9_QfLUVuTTUMpavuB919fzojKYxhrnJW-t-r3if243iDestMTmywchcrpO2KeYDg6akcuuBsyDamHP-ADNRqcLtyFhnDmfR-Acnv3uvJgXkMn0W3ntuiHy4JqSmJAAPpdcPQ")

	val headers_26 = Map(
		"Accept" -> "text/turtle",
		"DPoP" -> "eyJhbGciOiJFUzI1NiIsInR5cCI6ImRwb3Arand0IiwiandrIjp7Imt0eSI6IkVDIiwia2lkIjoiRi1qS3YxbUx6RDFMMG94MVg2X2dCdVd6WENZd1Q1Ql9UVFJnMXB3bHI4NCIsImFsZyI6IkVTMjU2IiwiY3J2IjoiUC0yNTYiLCJ4IjoiQ1Zzd1Bkd05wUXl3QThMVFZqU0Y5REFVWU9mSkdteG5TcWNxc0VEUXpROCIsInkiOiJ4RDNWMTdMSlo4cWVzeDZMMVdHdkp3UmN0VjhpMlZRWldOa0FfUmMtVGJvIn19.eyJodHUiOiJodHRwczovL3JhZGFyaW4uaW5ydXB0Lm5ldC9wdWJsaWMvUmFkYXJpbkxvY2F0aW9uc18vc2F2ZWRMb2NhdGlvbnMudHRsIiwiaHRtIjoiR0VUIiwianRpIjoiMDFhZjE1NzQtMTUyMC00NmFkLTg0NDItOWFjZjM5ZTVmMzUzIiwiaWF0IjoxNjE5NjIwMTI0fQ.BO925DOeRAXm0DgRcKmQi6X6QD8iZgfYUVSsjvXyDHSmdMlnFgKzCKReUZfYmUaZpvEzTWILE92XxmNa6N-OWg",
		"Origin" -> "https://radarinen3bwebapp.herokuapp.com",
		"authorization" -> "DPoP eyJhbGciOiJSUzI1NiIsImtpZCI6IlJTZFhXUEplV0pJIn0.eyJpc3MiOiJodHRwczovL2lucnVwdC5uZXQiLCJhdWQiOiJzb2xpZCIsInN1YiI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSIsImV4cCI6MTYyMDgyOTcyMiwiaWF0IjoxNjE5NjIwMTIyLCJqdGkiOiJiNmM1MzM5ZmEzZjQxMzY1IiwiY25mIjp7ImprdCI6IkYtakt2MW1MekQxTDBveDFYNl9nQnVXelhDWXdUNUJfVFRSZzFwd2xyODQifSwiY2xpZW50X2lkIjoiMzE2ZmQ1YTNiNTFkN2Q0M2Y0ZWY5YjAzYzJmMTZiNTkiLCJ3ZWJpZCI6Imh0dHBzOi8vcmFkYXJpbi5pbnJ1cHQubmV0L3Byb2ZpbGUvY2FyZCNtZSJ9.nRI3bKC0LSZec9yztg733NiMjqhJ19fPPuKO2br-T2kQuWn4YpmojmPSpkhEDaYf_spgwKgFZQyfIbBMPxtfa7cG3zIvYfvWtpXO6l7KanYVdZHT6r4BKAMOWDXuCWlS2TO0ugeYFAun_TNIdy4xI9QoFhLU_tF2zLH1ge1LuDnWyFkEx6OabM9JY60BGKs9xwqXyp1p7N4MDoPAxR9_QfLUVuTTUMpavuB919fzojKYxhrnJW-t-r3if243iDestMTmywchcrpO2KeYDg6akcuuBsyDamHP-ADNRqcLtyFhnDmfR-Acnv3uvJgXkMn0W3ntuiHy4JqSmJAAPpdcPQ")

	val headers_38 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"e864274f57867253d9e0b908a0ea9ad5"""")

	val headers_39 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"36e905378d980173e7d87d021cd56750"""")

	val headers_40 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"4dae3ae3af2451aaff0e08bc984b8050"""")

	val headers_41 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"c1190edd400603b53442c958e0697f30"""")

	val headers_42 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"48e8de3b72317215d7960f8f540fd6f1"""")

	val headers_43 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"6fbbf3d49715d46762dceb76a52cf75b"""")

	val headers_44 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"00dcad57eadef18e22889a978b5dbfcd"""")

	val headers_45 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"e8f52919196870858707917b5da285aa"""")

	val headers_46 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"ab28f207f269151a79cfeac297e24c45"""")

	val headers_47 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"2d530014327f6a37bae303e2f7a78d8f"""")

	val headers_48 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"3e48d2e88e3e2d0fa32eed61d65d187d"""")

	val headers_49 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"c2cd7ad42b2eeca6babff469e3a429d9"""")

	val headers_50 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"917a2a59e2cfd5d99dd083083b103dd1"""")

	val headers_51 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"d09dd7aac3ffd4b71283ce804a714c6e"""")

	val headers_52 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"91a39a9f0ad75f256077483fe42536af"""")

	val headers_53 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"6a58b3447efa1804ee4d7ac4b4cfc305"""")

	val headers_54 = Map(
		"Cache-Control" -> "max-age=0",
		"If-None-Match" -> """"b8de9e0d37391505e2790bf926ca2518"""")

    val uri1 = "https://c.tile.openstreetmap.org"
    val uri2 = "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
    val uri3 = "https://inrupt.net"
    val uri4 = "https://radarinen3brestapi.herokuapp.com/api/locations"
    val uri5 = "https://b.tile.openstreetmap.org"
    val uri6 = "https://a.tile.openstreetmap.org"
    val uri8 = "https://radarin.inrupt.net"

	val scn = scenario("loadTest2")
		.exec(http("request_0")
			.get("/")
			.headers(headers_0)
			.resources(http("request_1")
			.get("/src/App.css")
			.headers(headers_1)
			.check(status.is(404)),
            http("request_2")
			.get("/static/media/slick.29518378.woff")
			.headers(headers_2),
            http("request_3")
			.get("/static/media/carousel_1.acad13ea.png"),
            http("request_4")
			.get(uri2)))
		.pause(2)
		.exec(http("request_5")
			.get(uri3 + "/.well-known/openid-configuration")
			.headers(headers_5)
			.resources(http("request_6")
			.post(uri3 + "/register")
			.headers(headers_6)
			.body(RawFileBody("radarin_en3b/loadtest2/0006_request.json")),
            http("request_7")
			.get(uri3 + "/.well-known/openid-configuration")
			.headers(headers_5),
            http("request_8")
			.get(uri3 + "/authorize?client_id=316fd5a3b51d7d43f4ef9b03c2f16b59&redirect_uri=https%3A%2F%2Fradarinen3bwebapp.herokuapp.com%2F&response_type=code&scope=openid%20webid&state=4712c438af9947409b8cab713f59f877&code_challenge=MIY9Fy8oAKhPm6Olo2IDZpnPbQs-0BMIGvK3dTyDmFI&code_challenge_method=S256&response_mode=query")
			.headers(headers_8),
            http("request_9")
			.get("/src/App.css")
			.headers(headers_1)
			.check(status.is(404)),
            http("request_10")
			.get("/static/js/2.509668d4.chunk.js")
			.headers(headers_10),
            http("request_11")
			.get("/static/css/2.3021dfe7.chunk.css")
			.headers(headers_11),
            http("request_12")
			.get("/static/js/main.2ee1735e.chunk.js")
			.headers(headers_12),
            http("request_13")
			.get("/static/css/main.88ea1b0b.chunk.css")
			.headers(headers_13),
            http("request_14")
			.get(uri2)
			.headers(headers_14),
            http("request_15")
			.get("/static/media/carousel_1.acad13ea.png")
			.headers(headers_15),
            http("request_16")
			.get(uri3 + "/.well-known/openid-configuration")
			.headers(headers_5),
            http("request_17")
			.post(uri3 + "/token")
			.headers(headers_17)
			.formParam("grant_type", "authorization_code")
			.formParam("redirect_uri", "https://radarinen3bwebapp.herokuapp.com/")
			.formParam("code", "1316ac408e81f7ee740cdefaf8f220af")
			.formParam("code_verifier", "8306a496c4b4482a85df607237f031fb025d0e6c1ca743dea4bed2aeffe122b330b74268902342f19cc78d007d9691fe")
			.formParam("client_id", "316fd5a3b51d7d43f4ef9b03c2f16b59")
			.basicAuth("316fd5a3b51d7d43f4ef9b03c2f16b59","b18b73ef351a1a311d2d9960198782a3"),
            http("request_18")
			.get(uri8 + "/profile/card")
			.headers(headers_18),
            http("request_19")
			.get("/static/js/3.d6dbd3e7.chunk.js")
			.headers(headers_19),
            http("request_20")
			.get(uri8 + "/profile/card")
			.headers(headers_20),
            http("request_21")
			.get(uri8 + "/private/RadarinPrKey/privateKey.ttl")
			.headers(headers_21),
            http("request_22")
			.get(uri8 + "/private/RadarinPrKey/privateKey.ttl")
			.headers(headers_22),
            http("request_23")
			.options(uri4 + "?webId=https%3A%2F%2Fradarin.inrupt.net%2Fprofile%2Fcard%23me")
			.headers(headers_23),
            http("request_24")
			.get(uri4 + "?webId=https%3A%2F%2Fradarin.inrupt.net%2Fprofile%2Fcard%23me")
			.headers(headers_24),
            http("request_25")
			.get(uri8 + "/profile/card")
			.headers(headers_25),
            http("request_26")
			.get(uri8 + "/public/RadarinLocations_/savedLocations.ttl")
			.headers(headers_26)))
		.pause(1)
		.exec(http("request_27")
			.get(uri1 + "/13/3963/2999.png")
			.resources(http("request_28")
			.get(uri1 + "/14/7925/5997.png"),
            http("request_29")
			.get(uri6 + "/14/7924/5996.png"),
            http("request_30")
			.get(uri6 + "/14/7926/5997.png"),
            http("request_31")
			.get(uri1 + "/14/7925/6000.png"),
            http("request_32")
			.get(uri5 + "/14/7924/6000.png"),
            http("request_33")
			.get(uri1 + "/14/7927/5998.png"),
            http("request_34")
			.get(uri5 + "/14/7925/5999.png"),
            http("request_35")
			.get(uri5 + "/14/7927/5997.png"),
            http("request_36")
			.get(uri5 + "/14/7924/5997.png"),
            http("request_37")
			.get(uri1 + "/14/7924/5998.png"),
            http("request_38")
			.get(uri5 + "/15/15851/11996.png")
			.headers(headers_38),
            http("request_39")
			.get(uri1 + "/15/15850/11995.png")
			.headers(headers_39),
            http("request_40")
			.get(uri1 + "/15/15852/11996.png")
			.headers(headers_40),
            http("request_41")
			.get(uri6 + "/15/15851/11995.png")
			.headers(headers_41),
            http("request_42")
			.get(uri5 + "/15/15852/11995.png")
			.headers(headers_42),
            http("request_43")
			.get(uri1 + "/15/15851/11997.png")
			.headers(headers_43),
            http("request_44")
			.get(uri1 + "/15/15853/11998.png")
			.headers(headers_44),
            http("request_45")
			.get(uri5 + "/15/15853/11994.png")
			.headers(headers_45),
            http("request_46")
			.get(uri1 + "/15/15853/11995.png")
			.headers(headers_46),
            http("request_47")
			.get(uri6 + "/15/15853/11996.png")
			.headers(headers_47),
            http("request_48")
			.get(uri5 + "/15/15850/11994.png")
			.headers(headers_48),
            http("request_49")
			.get(uri1 + "/15/15850/11998.png")
			.headers(headers_49),
            http("request_50")
			.get(uri5 + "/15/15852/11998.png")
			.headers(headers_50),
            http("request_51")
			.get(uri6 + "/15/15852/11994.png")
			.headers(headers_51),
            http("request_52")
			.get(uri6 + "/15/15851/11998.png")
			.headers(headers_52),
            http("request_53")
			.get(uri6 + "/15/15852/11997.png")
			.headers(headers_53),
            http("request_54")
			.get(uri5 + "/15/15853/11997.png")
			.headers(headers_54)))

	setUp(scn.inject(constantUsersPerSec(2) during (60 seconds) randomized)).protocols(httpProtocol)
}