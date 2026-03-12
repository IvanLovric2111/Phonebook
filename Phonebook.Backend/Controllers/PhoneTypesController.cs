using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Phonebook.Backend.Business.Interfaces;

using Phonebook.Backend.DataAccess.Entities;

[Route("api/[controller]")]
[ApiController]
public class PhoneTypesController : ControllerBase
{
    private readonly IPhoneTypeService _phoneTypeService;

    public PhoneTypesController(IPhoneTypeService phoneTypeService)
    {
        _phoneTypeService = phoneTypeService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PhoneType>>> GetPhoneTypes()
    {
        var types = await _phoneTypeService.GetAllPhoneTypesAsync();
        return Ok(types);
    }
}