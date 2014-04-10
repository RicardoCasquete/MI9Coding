using System.Net;
using System.Web.Mvc;
using MI9App.Web.Controllers;

namespace MI9App.Web.Filters
{
    public class CustomerErrorHandlerAttribute : FilterAttribute, IExceptionFilter
    {
        public void OnException(ExceptionContext filterContext)
        {
            filterContext.ExceptionHandled = true;
            filterContext.HttpContext.Response.Clear();

            filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;
            filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            filterContext.Result = new JsonCamelCaseResult(new { Error = "Could not decode request" }, JsonRequestBehavior.AllowGet);
        }
    }
}