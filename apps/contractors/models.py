from django.db import models

from phone_field import PhoneField
from django_countries.fields import CountryField


class Company(models.Model):
    """Model definition for Company."""

    name = models.CharField('Company Name', max_length=50)

    class Meta:
        """Meta definition for Company."""

        verbose_name = 'Company'
        verbose_name_plural = 'Companies'

    def __str__(self):
        """Unicode representation of Company."""
        return self.name


class Priority(models.Model):
    """Model definition for Priority."""

    name = models.CharField('Priority Name', max_length=7, unique=True, blank=False, null=False)

    class Meta:
        """Meta definition for Priority."""

        verbose_name = 'Priority'
        verbose_name_plural = 'Priorities'

    def __str__(self):
        """Unicode representation of Priority."""
        return self.name


class Priority(models.Model):
    """Model definition for Priority."""

    name = models.CharField('Priority Name', max_length=7, unique=True, blank=False, null=False)

    class Meta:
        """Meta definition for Priority."""

        verbose_name = 'Priority'
        verbose_name_plural = 'Priorities'

    def __str__(self):
        """Unicode representation of Priority."""
        return self.name


class Contractor(models.Model):
    """Model definition for Contrator."""

    name = models.CharField('Name', max_length=50, blank=False, null=False)
    company = models.CharField("Company Name", max_length=50, blank=False, null=False)
    priority = models.ForeignKey(Priority, on_delete=models.CASCADE, verbose_name='Priority Name')
    country = models.CharField('Country Name', max_length=30, blank=False, null=False)
    phone_number = PhoneField('Phone Number')
    email = models.EmailField('Email Address', max_length=254)

    class Meta:
        """Meta definition for Contrator."""

        verbose_name = 'Contrator'
        verbose_name_plural = 'Contrators'

    def __str__(self):
        """Unicode representation of Contrator."""
        return f'{self.name} from {self.company}'


