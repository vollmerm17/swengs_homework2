from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Country(models.Model):
    name = models.TextField()
    city = models.TextField()

    def __str__(self):
        return self.name


class Company(models.Model):
    CHOICES = (
        ('IT', 'Information Technology'),
        ('LO', 'Logistics'),
        ('OL', 'Oil'),
        ('LS', 'Life-Science')
    )

    name = models.TextField()
    industry = models.CharField(max_length=2, choices=CHOICES)
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=True)
    founding_date = models.DateField()
    customers = models.ManyToManyField('Client', blank=True)
    telephone_number = PhoneNumberField(null=False, blank=False)

    def __str__(self):
        return self.name


# Person
class Client(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()

    def __str__(self):
        return '%s %s' % (self.first_name, self.last_name)

