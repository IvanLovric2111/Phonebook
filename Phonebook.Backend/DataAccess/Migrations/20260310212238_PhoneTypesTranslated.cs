using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Phonebook.Backend.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class PhoneTypesTranslated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "PhoneTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Mobile");

            migrationBuilder.UpdateData(
                table: "PhoneTypes",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Home");

            migrationBuilder.UpdateData(
                table: "PhoneTypes",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Work");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "PhoneTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Mobilni");

            migrationBuilder.UpdateData(
                table: "PhoneTypes",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Fiksni");

            migrationBuilder.UpdateData(
                table: "PhoneTypes",
                keyColumn: "Id",
                keyValue: 3,
                column: "Name",
                value: "Poslovni");
        }
    }
}
