# 🔗 End-to-End ServiceNow Instance Integration

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=6A9FBF&width=600&lines=REST+API+Integration;ServiceNow+Instance+to+Instance;Business+Rule+Automation+%7C+Global+Scope" alt="Typing SVG" />

![Platform](https://img.shields.io/badge/Platform-ServiceNow-green?style=for-the-badge&logo=servicenow)
![Scope](https://img.shields.io/badge/Scope-Global-blue?style=for-the-badge)
![Type](https://img.shields.io/badge/Type-REST%20API%20Integration-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-brightgreen?style=for-the-badge)

---

## 📌 Overview

Built a **real-time REST API integration** between two ServiceNow instances to automatically synchronise Problem records. When a Problem record is created in the **Source** instance, the same record is automatically created in the **Target** instance — with no manual intervention.

The integration was implemented using **3 progressive approaches**, evolving from a basic hardcoded test to a fully automated Business Rule-driven solution.

---

## 🎯 Use Case

> When a Problem record is created in the **Source** ServiceNow instance, automatically create a corresponding Problem record in the **Target** ServiceNow instance using the REST API.

---

## 🔄 Data Flow

```
Source Instance
      ↓
Problem Record Created
      ↓
Business Rule (Before Insert)
      ↓
sn_ws.RESTMessageV2 API
      ↓
Outbound REST Message → POST /api/now/table/problem
      ↓
Target Instance
New Problem Record Created ✅
```

---

## 🏗️ Implementation – 3 Approaches

### Approach 1 — Hardcoded JSON Testing (Initial Validation)

- Set up Outbound REST Message: `Snow ebonding integration`
- Configured endpoint: `https://dev182210.service-now.com/`
- Authentication: Basic Auth (profile: Keerthana)
- Created HTTP Method: `Default GET` — tested connectivity (`HTTP 200 ✅`)
- Created HTTP Method: `Problem Creation` — POST to `/api/now/table/problem`
- Headers: `Content-Type: application/json`, `Accept: application/json`

```json
{
  "short_description": "Integration",
  "description": "Testing snow end to end integration in problem record"
}
```

> ✅ Result: `HTTP 201` — Problem record **PRB0040020** created in target instance

---

### Approach 2 — Dynamic Parameter Approach

Replaced hardcoded values with variables: `${sd}` and `${desc}`

```json
{
  "short_description": "${sd}",
  "description": "${desc}"
}
```

Used `setStringParameterNoEscape()` for dynamic value injection.

> ✅ Result: Record created with dynamic values (**PRB0040022** — "Passing values dynamically")

---

### Approach 3 — Business Rule Driven Automation (Final)

Created a **Before Insert Business Rule** on the Problem table:

| Property | Value |
|---|---|
| Name | `Problem Creation for Integration` |
| Trigger | Before Insert on `problem` table |
| Scripting API | `sn_ws.RESTMessageV2` |

```javascript
(function executeRule(current, previous /*null when async*/) {
    try {
        var r = new sn_ws.RESTMessageV2('Snow ebonding integration', 'Problem Creation');
        r.setStringParameterNoEscape('sd', current.short_description);
        r.setStringParameterNoEscape('desc', current.description);
        var response = r.execute();
        var responseBody = response.getBody();
        var httpStatus = response.getStatusCode();
        gs.log("The response from target instance is " + responseBody);
        gs.log("The status code of my REST message is " + httpStatus);
    } catch (ex) {
        var message = ex.message;
    }
})(current, previous);
```

> ✅ Result: Any new Problem record in Source **automatically appears in Target** — fully automated!

---

## ⚙️ Technical Configuration

| Component | Detail |
|---|---|
| REST Message Name | `Snow ebonding integration` |
| Application | Global |
| Endpoint | `https://dev182210.service-now.com/` |
| Authentication | Basic Authentication |
| HTTP Method | POST |
| API Endpoint | `/api/now/table/problem` |
| Content-Type | `application/json` |
| Accept | `application/json` |
| Business Rule | Before Insert on Problem table |
| Scripting API | `sn_ws.RESTMessageV2` |

---

## ✅ Skills Demonstrated

![REST API](https://img.shields.io/badge/REST-API%20Integration-green?style=flat-square)
![Business Rules](https://img.shields.io/badge/Business-Rules-blue?style=flat-square)
![Scripting](https://img.shields.io/badge/Scripting-RESTMessageV2-orange?style=flat-square)
![Testing](https://img.shields.io/badge/Testing-End--to--End-purple?style=flat-square)

- 🌐 Outbound REST Message configuration in ServiceNow
- 🔐 REST API authentication (Basic Auth)
- 📡 GET and POST HTTP method design and testing
- 🔄 Dynamic parameter passing with `setStringParameterNoEscape()`
- ⚙️ Business Rule scripting (Before Insert trigger)
- 📦 `sn_ws.RESTMessageV2` API usage
- 🪵 System logging with `gs.log()` for debugging
- 🧪 End-to-end integration testing and validation
- 🔗 Instance-to-instance communication on the Now Platform

---

## 💡 Key Learnings

| Learning | Detail |
|---|---|
| Validate first | Always test connectivity with a GET before building POST methods |
| Use dynamic params | `setStringParameterNoEscape()` makes integrations reusable |
| Automate with BR | Business Rules are the most efficient way to trigger REST calls |
| Log everything | `gs.log()` is essential for monitoring responses and HTTP status codes |
| HTTP codes | `201` = record created ✅ \| `200` = successful read ✅ |

---

## ⚠️ Common Mistakes to Avoid

| ❌ Mistake | ✅ Best Practice |
|---|---|
| Skipping GET connectivity test | Always validate with GET before POST |
| Hardcoding values in REST body | Use dynamic parameters for reusability |
| Missing error handling in script | Always wrap in `try/catch` block |
| Not checking HTTP status code | Log and verify `getStatusCode()` after every call |
| Wrong authentication profile | Verify Basic Auth credentials before testing |

---

<div align="center">

**Made with ❤️ by Keerthana Chennuru**

![ServiceNow](https://img.shields.io/badge/Built%20on-ServiceNow-green?style=for-the-badge)

</div>
