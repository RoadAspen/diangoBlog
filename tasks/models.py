from django.db import models

    
# Task模型
class Task(models.Model):
    name = models.CharField(verbose_name="Task name", max_length=65, unique=True)
    status = models.CharField(verbose_name="Task status", max_length=1)

    def __str__(self):
        return self.name