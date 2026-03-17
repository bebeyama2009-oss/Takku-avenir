from django.db import models

class Career(models.Model):
    """Career/Métier model"""
    
    CATEGORY_CHOICES = [
        ('SANTE', 'Santé'),
        ('TECH', 'Technologies'),
        ('COMMERCE', 'Commerce & Gestion'),
        ('ENSEIGNEMENT', 'Enseignement'),
        ('DROIT', 'Droit & Administration'),
        ('ARTS', 'Arts & Communication'),
        ('INGENIERIE', 'Ingénierie'),
        ('AUTRES', 'Autres'),
    ]
    
    DEMAND_CHOICES = [
        ('HIGH', 'Forte'),
        ('MEDIUM', 'Moyenne'),
        ('LOW', 'Faible'),
    ]
    
    EDUCATION_CHOICES = [
        ('BAC', 'Bac'),
        ('BAC+2', 'Bac+2'),
        ('BAC+3', 'Licence (Bac+3)'),
        ('BAC+5', 'Master (Bac+5)'),
        ('BAC+8', 'Doctorat (Bac+8)'),
    ]
    
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    daily_routine = models.TextField(help_text="Description d'une journée type")
    
    required_education = models.CharField(max_length=20, choices=EDUCATION_CHOICES)
    required_skills = models.JSONField(default=list, help_text="Liste des compétences requises")
    
    salary_entry = models.IntegerField(help_text="Salaire débutant en FCFA")
    salary_5years = models.IntegerField(help_text="Salaire après 5 ans en FCFA")
    market_demand = models.CharField(max_length=20, choices=DEMAND_CHOICES)
    
    video_url = models.URLField(blank=True, help_text="Lien vers vidéo témoignage")
    testimonial_text = models.TextField(blank=True)
    testimonial_author = models.CharField(max_length=200, blank=True)
    
    recommended_series = models.JSONField(default=list, help_text="Séries recommandées: S, L, G")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['name']
        verbose_name = 'Métier'
        verbose_name_plural = 'Métiers'
    
    def __str__(self):
        return self.name


class Favorite(models.Model):
    """User favorites (careers)"""
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='favorites')
    career = models.ForeignKey(Career, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'career']
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.career.name}"
